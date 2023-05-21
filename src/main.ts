import {bootstrapApplication, BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {AppRoutingModule} from "./app/app-routing.module";
import {importProvidersFrom} from "@angular/core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AppModule} from "./app/app.module";
import {MatDialogModule} from "@angular/material/dialog";
import {StoreModule} from "@ngrx/store";
import {usernameReducer} from "./app/reducer/store/user-reducer";

/**
 * since I'm using standalone components all the services need to be declared here so the can be used
 * globally -> Singleton
 * */

bootstrapApplication(AppComponent, {
    providers: [
        //import all the module globally here so I don't have to declare them in component every time
        //the idea is that any modules used by components or services need to be provided here
        //if the component or service uses something from that module
        importProvidersFrom(  //very important this line -> it enables routing with standalone components
            AppRoutingModule,
            BrowserAnimationsModule,
            MatIconModule,
            HttpClientModule,
            StoreModule.forRoot({addLoggedUser: usernameReducer}),
            BrowserModule,
            AppModule,
            FontAwesomeModule), // -> https://www.npmjs.com/package/@fortawesome/angular-fontawesome -> install and shit
        //declare here all the services that we use in the app so we cal use them globally -> Singleton and shit
        MatIconRegistry,
        MatDialogModule,

    ]
});
