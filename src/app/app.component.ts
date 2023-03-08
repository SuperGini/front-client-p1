import { Component } from '@angular/core';
import {StartComponent} from "./components/start/start.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    StartComponent,
    RouterOutlet
  ],
  standalone: true
})
export class AppComponent {

}
