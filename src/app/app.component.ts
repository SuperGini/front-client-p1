import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {

  constructor(private fontAwesomeIcons: FontAwesomeIconService) {

  }

  //https://stackoverflow.com/questions/49015284/clear-local-storage-when-the-browser-closes-in-angular
  // @HostListener("window:beforeunload",["$event"])
  // clearLocalStorage(event){
  //   localStorage.removeItem('username');
  //   return false;
  // }

  ngOnInit(): void {
    this.fontAwesomeIcons.loadIcons();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }
}
