import {Component, inject, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FolderService} from "../../../../services/gateway/folderService";
import {FolderResponse} from "../../../../model/folder";
import {NgForOf} from "@angular/common";

@Component({
    selector: "app-home-panel",
    templateUrl: "./homePanel.html",
    styleUrls: ["./homePanel.css"],
    imports: [
        FontAwesomeModule,
        NgForOf,
    ],
    standalone: true
})
export class HomePanelComponent implements OnInit{

    homePanelFolders:Array<FolderResponse>;

    private folderService = inject(FolderService);

    ngOnInit(): void {
        this.getFoldersWithPagination();
    }

    private getFoldersWithPagination() {
        this.folderService.getFoldersWithPagination('430430623502988438', 1)
            .subscribe(response => {
                console.log(response);
                this.homePanelFolders = response.folderResponses;
            })
    }



}
