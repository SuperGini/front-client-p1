import { Component } from '@angular/core';
import {StartComponent} from "./components/start/start.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    StartComponent
  ],
  standalone: true
})
export class AppComponent {

}
