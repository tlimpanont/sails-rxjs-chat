import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, appRoutingProviders}  from './app.routing';
import {MdCoreModule} from "@angular2-material/core";
import {MdButtonModule} from "@angular2-material/button";
import {MdIconModule, MdIconRegistry} from "@angular2-material/icon";

import {AppComponent}  from './app.component';
import {HomeComponent} from "./home.component";
import {SocketService} from "./socket.service";

@NgModule({
  imports: [BrowserModule, routing, MdCoreModule, MdButtonModule, MdIconModule],
  declarations: [AppComponent, HomeComponent],
  providers: [
    appRoutingProviders,
    SocketService,
    MdIconRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
