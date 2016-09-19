import {Component, NgZone, Inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SocketService} from "./socket.service";
import {Observable} from "rxjs";

@Component({
  selector: 'home-component',
  template: `
    <h1>Home Component</h1>
    `,
})
export class HomeComponent {
  socketService: SocketService;
  data: any;

  constructor(public route: ActivatedRoute) {
    let data: any = route.snapshot.data;
    this.socketService = data.socket;

    let getReverse$ = this.socketService.get$('/user').map(x => x.reverse());

    getReverse$
      .subscribe((x) => {
        this.data = x;
      });

    this.socketService.on$('user')
      .mergeMap(x => getReverse$)
      .subscribe((x) => {
        console.log(x);
        this.data = x;
      });
  }
}
