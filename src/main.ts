import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {AppRoutingModule} from "./app/app-routing.module";
import {importProvidersFrom} from "@angular/core";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule) //very important this line -> it enables routing with standalone components
  ]
});
