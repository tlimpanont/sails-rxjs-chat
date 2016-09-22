import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, appRoutingProviders}  from './app.routing';

import {AppComponent}  from './app.component';
import {HomeComponent} from "./home.component";
import {SocketService} from "./socket.service";
import {HttpModule} from "@angular/http";
import {BehaviorSubject} from "rxjs/Rx";

@NgModule({
  imports: [BrowserModule, HttpModule, routing],
  declarations: [AppComponent, HomeComponent],
  providers: [
    appRoutingProviders,
    SocketService,
    {provide: 'connection$', useValue: new BehaviorSubject<any>({connected: false})}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
