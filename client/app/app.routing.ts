import {ModuleWithProviders, Injectable} from '@angular/core';
import {Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {HomeComponent} from "./home.component";
import {SocketService} from "./socket.service";

const appRoutes: Routes = [
  // { path: 'hero/:id', component: HeroDetailComponent },
  // { path: 'crisis-center', component: CrisisCenterComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: {
  //     title: 'Heroes List'
  //   }
  // },
  {path: '', component: HomeComponent, resolve: {socket: SocketService}},
  // { path: '**', component: AppComponent },
  // { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
