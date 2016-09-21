import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SocketService} from "./socket.service";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'home-component',
  template: `
        <h1>Home Component</h1>
        <pre>
            {{data | json}}
        </pre>
    `,
})
export class HomeComponent {
  socketService: SocketService;
  data: any;

  constructor(public route: ActivatedRoute) {
    let data: any = route.snapshot.data;
    this.socketService = data.socket;

    let getUser$ = this.socketService.get$('/user').map(x => x.response.reverse());

    getUser$
      .subscribe((x) => {
        this.data = x;
      });

    this.socketService.on$('user').subscribe((event: any) => {
      console.log(event);
    });

    this.socketService.on$('user')
      .merge(this.socketService.on$('connect'))
      .mergeMap(() => getUser$)
      .subscribe( (users: any) => {
        this.data = users;
      });


  }
}
