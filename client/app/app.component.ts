import {Component, ViewChild, ElementRef, AfterViewInit, Inject} from '@angular/core';
import 'node_modules/jquery/dist/jquery.js';
import 'node_modules/semantic-ui/dist/semantic.js';
import {BehaviorSubject} from "rxjs/Rx";
declare var jQuery:any;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  connected: boolean = true;
  @ViewChild('alert') alert:ElementRef;

  constructor(@Inject('connection$') public connection$:BehaviorSubject<any>) {
    this.connection$.subscribe( (connection: any) => {
      this.connected = connection.connected;
    });
  }
  ngAfterViewInit() {
  }
}
