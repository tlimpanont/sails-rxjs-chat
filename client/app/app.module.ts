import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, appRoutingProviders}  from './app.routing';

import {AppComponent}  from './app.component';
import {HomeComponent} from "./home.component";
import {SocketService} from "./socket.service";

@NgModule({
  imports: [BrowserModule, routing],
  declarations: [AppComponent, HomeComponent],
  providers: [
    appRoutingProviders,
    SocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
