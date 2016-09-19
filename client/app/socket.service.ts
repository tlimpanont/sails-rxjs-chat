import {Observable, Observer, Subject} from 'rxjs/Rx';
import {Resolve} from '@angular/router';
import {Injectable, NgZone} from "@angular/core";
var socketIOClient: any = require('socket.io-client');
var sailsIOClient: any = require('sails.io.js');
var io: any = sailsIOClient(socketIOClient);

@Injectable()
export class SocketService implements Resolve<any> {
  socket: any;

  constructor(public ngZone: NgZone) {
    io.sails.url = 'http://localhost:1337/';
    io.sails.autoConnect = false;
    this.socket = io.sails.connect();
  }

  private _invokeMethode(method: string, data: any, path: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.socket[method](path, data, (response: any) => {
        this.ngZone.run(() => {
          observer.next(response);
        });
      });
      return () => {
      }
    });
  }

  get$(path: string): Observable<any> {
    return this._invokeMethode('get', null, path);
  }

  post$(path: string, data: any): Observable<any> {
    return this._invokeMethode('post', data, path);
  }

  on$(path: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.socket['on'](path, (response: any) => {
        this.ngZone.run(() => {
          observer.next(response);
        });
      });
      return () => {
      }
    });
  }

  resolve(): Observable<any>|Promise<any>|any {

    return new Promise((resolve: any, reject: any) => {
      this.socket.on('connect', () => {
        resolve(this);
      });
      this.socket.on('error', () => {
        reject(null);
      });
    });
  }
}
