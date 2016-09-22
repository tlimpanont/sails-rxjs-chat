import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SailsSocketService} from "./sails-socket.service";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'home-component',
  template: `
        <div class="ui middle aligned animated list">
          <div class="item" *ngFor="let user of data">
            <img class="ui avatar image" src="http://semantic-ui.com/images/avatar/small/daniel.jpg">
            <div class="content">
              <div class="header">{{user.name}}</div>
            </div>
          </div>
        </div>
    `,
})
export class HomeComponent {
  socketService: SailsSocketService;
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
