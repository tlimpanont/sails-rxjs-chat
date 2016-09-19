import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SocketService} from "./socket.service";

@Component({
  selector: 'home-component',
  template: `
    <button md-button>FLAT</button>
<button md-raised-button>RAISED</button>
<button md-icon-button>
   <md-icon class="md-24">favorite</md-icon>
</button>
<button md-fab>
   <md-icon class="md-24">add</md-icon>
</button>
<button md-mini-fab>
   <md-icon class="md-24">add</md-icon>
</button>
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
      .combineLatest(getReverse$)
      .subscribe(([event, newCollection]) => {
        console.log('event', event);
        console.log('collection', newCollection);
      });
  }
}
