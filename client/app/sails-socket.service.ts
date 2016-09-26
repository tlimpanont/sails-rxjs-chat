import {Observable, Observer, Subject, BehaviorSubject} from 'rxjs/Rx';
import {Resolve} from '@angular/router';
import {Injectable, NgZone, Inject} from "@angular/core";
import {Http} from "@angular/http";
var socketIOClient: any = require('socket.io-client');
var sailsIOClient: any = require('sails.io.js');
var io: any = sailsIOClient(socketIOClient);

@Injectable()
export class SailsSocketService implements Resolve<any> {
  socket: any;
  public connection$: BehaviorSubject<any> = new BehaviorSubject<any>({connected: false});

  constructor(public ngZone: NgZone,
              public http: Http) {

    io.sails.url = 'http://localhost:1337/';
    io.sails.autoConnect = false;
    this.socket = io.sails.connect();
  }

  private _invokeMethode(method: string, path: string, data: any = null): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.socket[method](path, data, (response: JSON, jwres: any) => {
        this.ngZone.run(() => {
          observer.next({response: response, jwres: jwres});
        });
      });
      return () => {
      }
    });
  }

  get$(path: string, data: any = null): Observable<any> {
    return this._invokeMethode('get', path, data);
  }

  post$(path: string, data: any): Observable<any> {
    return this._invokeMethode('post', path, data);
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
    })
  }

  resolve(): Observable<any>|Promise<any>|any {

    return new Promise((resolve: any, reject: any) => {

      this.http.get('http://localhost:1337/__getcookie')
        .retryWhen(error => error.delay(3000))
        .subscribe(() => {
          this.socket = io.sails.connect();
          this.on$('connect').subscribe(() => {
            this.connection$.next({connected: true});
            resolve(this);
          });
          this.on$('disconnect').subscribe(() => {
            this.connection$.next({connected: false});
          });
        }, () => {
          this.connection$.next({connected: false});
          reject(this);
        });
    });
  }
}
