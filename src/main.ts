import {bootstrapApplication, BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {AppRoutingModule} from "./app/app-routing.module";
import {importProvidersFrom} from "@angular/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

/**
 * since I'm using standalone components all the services need to be declared here so the can be used
 * globally -> Singleton
 * */

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule, BrowserAnimationsModule, MatIconModule, HttpClientModule, BrowserModule), //very important this line -> it enables routing with standalone components
    //declare here all the services that we use in the app so we cal use them globally -> Singleton and shit
    MatIconRegistry
  ]
});
