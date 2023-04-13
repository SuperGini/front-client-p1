import {Component, inject, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-folder-info-panel",
  templateUrl: "./folderInfoPanel.html",
  styleUrls: ["./folderInfoPanel.css"],
  imports: [
    FontAwesomeModule
  ],
  standalone: true
})
export class FolderInfoPanelComponent implements OnInit{


  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
        console.log(this.activeRoute.params);
        console.log(`ParamId: ` + params['id']);
    })
  }




}
