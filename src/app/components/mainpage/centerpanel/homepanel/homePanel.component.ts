import {Component, inject, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FolderService} from "../../../../services/gateway/folderService";
import {FolderResponse} from "../../../../model/folder";
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";

@Component({
    selector: "app-home-panel",
    templateUrl: "./homePanel.html",
    styleUrls: ["./homePanel.css"],
    imports: [
        FontAwesomeModule,
        NgForOf,
        MatPaginatorModule,
        NgIf,
        NgClass,
        NgSwitch,
        NgSwitchCase,
    ],
    standalone: true
})
export class HomePanelComponent implements OnInit{

    length: number;
    pageSize: number = 6;
    pageIndex: number = 0;
    pageSizeOptions = [1, 3, 6];
    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    pageEvent: PageEvent;
    homePanelFolders:Array<FolderResponse>;

    private folderService = inject(FolderService);

    handlePageEvent(e: PageEvent) {
        this.pageEvent = e;
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
        console.log(e);

        this.folderService.getFoldersWithPagination('433378544657914167', e.pageIndex, e.pageSize)
            .subscribe(response => {
                console.log(response);
                this.homePanelFolders = response.folderResponses;
                this.length = response.totalElements;
            })
    }

    ngOnInit(): void {
        this.getFoldersWithPagination();
    }

    private getFoldersWithPagination() {
        this.folderService.getFoldersWithPagination('433378544657914167', this.pageIndex, this.pageSize)
            .subscribe(response => {
                console.log(response);
                this.homePanelFolders = response.folderResponses;
                this.length = response.totalElements;
            })
    }

}
