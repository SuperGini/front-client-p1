import {Component} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LogoutComponent} from "./logoutpanel/logout.component";
import {HomePanelComponent} from "./homepanel/homePanel.component";

@Component({
  selector: 'app-central-panel',
  templateUrl: './centralPanel.html',
  styleUrls: ['./centralPanel.css'],
  imports: [
    FontAwesomeModule,
    HomePanelComponent,
    LogoutComponent
  ],
  standalone: true
})
export class CentralPanelComponent{

}
