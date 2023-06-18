import {Component, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FolderInfoPanelComponent} from "./folderinfopanel/folderInfoPanel.component";
import {PicturesPanelComponent} from "./picturespanel/picturesPanel.component";
import { RouterOutlet} from "@angular/router";

import {SecurityContext, SecurityUser} from "../../../cach/cach";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgForOf} from "@angular/common";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

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

 // user: Observable<{securityUser: SecurityUser}>;

  constructor(private securityContext: SecurityContext, private store: Store<{addLoggedUser: {securityUser: SecurityUser}}>) {
  }


  ngOnInit(): void {
    //todo: delete if statement when app is fully functional -> wrote if statement so i dont have null error
    if(this.securityContext.securityUser.value != null){
    //  this.username = this.securityContext.securityUser.value.username;

    }

    this.username = localStorage.getItem('username');

  }
}
