import {Component} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LogoutComponent} from "./logoutpanel/logout.component";
import {HomePanelComponent} from "./homepanel/homePanel.component";
import {PicturesPanelComponent} from "../rightpanel/picturespanel/picturesPanel.component";

@Component({
  selector: 'app-central-panel',
  templateUrl: './centralPanel.html',
  styleUrls: ['./centralPanel.css'],
  imports: [
    FontAwesomeModule,
    HomePanelComponent,
    LogoutComponent,
    PicturesPanelComponent
  ],
  standalone: true
})
export class CentralPanelComponent{

}
