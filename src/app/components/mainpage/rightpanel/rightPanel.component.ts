import {Component, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FolderInfoPanelComponent} from "./folderinfopanel/folderInfoPanel.component";
import {PicturesPanelComponent} from "./picturespanel/picturesPanel.component";
import { RouterOutlet} from "@angular/router";

import { SecurityContext} from "../../../cach/cach";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";

@Component({
  selector: "app-right-panel",
  templateUrl: "./rightPanel.html",
  styleUrls: ["./rightPanel.css"],
  imports: [
    FontAwesomeModule,
    FolderInfoPanelComponent,
    PicturesPanelComponent,
    RouterOutlet,
    MatGridListModule,
    NgForOf
  ],
  standalone: true
})
export class RightPanelComponent implements OnInit{

  username:string = 'username';


  constructor(private securityContext: SecurityContext) {
  }


  ngOnInit(): void {
    //todo: delete if statement when app is fully functional -> wrote if statement so i dont have null error
    if(this.securityContext.securityUser.value != null){
      this.username = this.securityContext.securityUser.value.username;
    }

  }
}
