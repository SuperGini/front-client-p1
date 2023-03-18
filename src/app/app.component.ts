import {Component, OnInit} from '@angular/core';
import {StartComponent} from "./components/start/start.component";
import {RouterOutlet} from "@angular/router";
import {FontAwesomeIconService} from "./services/icons/fontAwesomeIcon.service";

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
export class AppComponent implements OnInit {

  constructor(private fontAwesomeIcons: FontAwesomeIconService) {

  }

  ngOnInit(): void {
    this.fontAwesomeIcons.loadIcons();
  }
}
