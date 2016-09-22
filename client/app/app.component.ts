import {Component, ViewChild, ElementRef, AfterViewInit, Inject} from '@angular/core';
import 'node_modules/jquery/dist/jquery.js';
import 'node_modules/semantic-ui/dist/semantic.js';
import {BehaviorSubject} from "rxjs/Rx";

@Component({
  selector: 'my-app',
  template: `
     <div class="ui raised very padded text container segment">
     <div class="ui icon message orange" *ngIf="!connected" #alert>
      <i class="notched circle loading icon"></i>
      <div class="content">
        <div class="header">
          Just one second
        </div>
        <p>We're fetching that content for you.</p>
      </div>
    </div>
        <h1 class="ui header">Rxjs Sails Chat</h1>
        <router-outlet></router-outlet>
      </div>
    `,
})
export class AppComponent {
  connected: boolean = true;
  @ViewChild('alert') alert:ElementRef;

  constructor(@Inject('connection$') public connection$:BehaviorSubject<any>) {
    // let connected$ = this.connection$.map(x => x.connected).filter( x => x);
    // let disConnected$ = this.connection$.map(x => x.connected).filter( x => !x);
    //
    // connected$.subscribe( () => this.connected = true);
    // disConnected$.subscribe( () => this.connected = false);
    connection$.subscribe( (connection: any) => {
      this.connected = connection.connected;
    });
  }
}
