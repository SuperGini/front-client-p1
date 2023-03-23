import {Component} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FolderInfoPanelComponent} from "./folderinfopanel/folderInfoPanel.component";
import {PicturesPanelComponent} from "./picturespanel/picturesPanel.component";
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: "app-right-panel",
  templateUrl: "./rightPanel.html",
  styleUrls: ["./rightPanel.css"],
  imports: [
    FontAwesomeModule,
    FolderInfoPanelComponent,
    PicturesPanelComponent,
    RouterOutlet
  ],
  standalone: true
})
export class RightPanelComponent{

  constructor(private router: Router) {
  }

}
