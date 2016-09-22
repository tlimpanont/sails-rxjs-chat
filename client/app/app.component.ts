import {Component, ViewChild, ElementRef, AfterViewInit, Inject} from '@angular/core';
import 'node_modules/jquery/dist/jquery.js';
import 'node_modules/semantic-ui/dist/semantic.js';
import {BehaviorSubject} from "rxjs/Rx";
declare var jQuery:any;

@Component({
  selector: 'my-app',
  template: `
     <div class="ui raised very padded text container segment">
       <div class="ui icon message orange" #alert *ngIf="!connected">
        <i class="notched circle loading icon"></i>
        <div class="content">
          <div class="header">
            Reconnecting...
          </div>
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
    connection$.subscribe( (connection: any) => {
      this.connected = connection.connected;
    });
  }
}
