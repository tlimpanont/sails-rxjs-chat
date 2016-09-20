import {Component} from '@angular/core';
import 'node_modules/jquery/dist/jquery.js';
import 'node_modules/semantic-ui/dist/semantic.js';

@Component({
  selector: 'my-app',
  template: `
     <router-outlet></router-outlet>
    `,
})
export class AppComponent {

}
