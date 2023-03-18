import {Component} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatIconModule} from "@angular/material/icon";
import {LeftPanelComponent} from "./leftpanel/leftPanel.component";
import {HomePanelComponent} from "./centerpanel/homePanel.component";
import {RightPanelComponent} from "./rightpanel/rightPanel.component";


@Component({
  selector: 'app-home',
  templateUrl: 'mainPage.html',
  styleUrls: ['mainPage.css'],
  imports: [
    FontAwesomeModule,
    MatIconModule,
    LeftPanelComponent,
    HomePanelComponent,
    RightPanelComponent
  ],
  standalone: true
})
export class MainPageComponent {
}
