import {Component} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatIconModule} from "@angular/material/icon";
import {LeftPanelComponent} from "./leftpanel/leftPanel.component";
import {HomePanelComponent} from "./centerpanel/homepanel/homePanel.component";
import {RightPanelComponent} from "./rightpanel/rightPanel.component";
import {CentralPanelComponent} from "./centerpanel/centralPanel.component";


@Component({
  selector: 'app-home',
  templateUrl: 'mainPage.html',
  styleUrls: ['mainPage.css'],
  imports: [
    FontAwesomeModule,
    MatIconModule,
    LeftPanelComponent,
    HomePanelComponent,
    RightPanelComponent,
    CentralPanelComponent
  ],
  standalone: true
})
export class MainPageComponent {
}
