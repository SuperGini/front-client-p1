import {AfterViewChecked, Component, ElementRef, inject, OnInit, ViewChild} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FolderService} from "../../../../services/gateway/folderService";
import {FolderResponse} from "../../../../model/folder";
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";

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

    @ViewChild('infoTable')
    infoTable: ElementRef;
    htmlIndex: string;


    length: number;
    pageSize: number = 6;
    pageIndex: number = 0;
    pageSizeOptions = [1, 3, 6];
    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    pageEvent: PageEvent;
    homePanelFolders: Array<FolderResponse>;

    private folderService = inject(FolderService);
    private router = inject(Router);
    private activeRoute = inject(ActivatedRoute);

    handlePageEvent(e: PageEvent) {
        this.pageEvent = e;
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
        console.log(this.homePanelFolders);

        this.getFoldersWithPagination(this.pageIndex, this.pageSize);
    }

    ngOnInit(): void {
        console.log(this.homePanelFolders);
        this.getFoldersWithPagination(this.pageIndex, this.pageSize);
    }

    /**
     * I set here the param in the URL, but I can't get here the param from the url after I set it.
     * I will retrieve the param from the URL in FolderInfoPanelComponent component because
     * then new navigate path is set to that component and there I can get the param that I set here
     *
     * I use the i parameter here to set active row when I click the row
     * */
    getFolderInfo(index: string){
        console.log(`Selected folder id: ${index}`);
        this.router.navigate(['info', index],  {relativeTo: this.activeRoute});

        this.htmlIndex = index;

    }

    private getFoldersWithPagination(pageIndex: number, pageSize: number) {
        this.folderService.getFoldersWithPagination('433378544657914167', pageIndex, pageSize)
            .subscribe(response => {
                console.log(response);
                this.homePanelFolders = response.folderResponses;
                this.length = response.totalElements;
            })
    }
}
