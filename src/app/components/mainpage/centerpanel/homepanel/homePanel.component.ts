import {Component} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {LogoutComponent} from "../logoutpanel/logout.component";

@Component({
  selector: "app-home-panel",
  templateUrl: "./homePanel.html",
  styleUrls: ["./homePanel.css"],
    imports: [
        FontAwesomeModule,
    ],
  standalone: true
})
export class HomePanelComponent {

}
