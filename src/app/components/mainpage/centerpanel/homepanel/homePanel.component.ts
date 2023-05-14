import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FolderService} from "../../../../services/gateway/folderService";
import {FolderResponse} from "../../../../model/folder";
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {Flag, Flags, FolderArrays, PaginatorPageIndex} from "../../../../cach/cach";
import {skipWhile, Subscription, take} from "rxjs";
import {FolderInfo} from "../../../../model/folderInfo";
import {FileService} from "../../../../services/gateway/fileService";

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
    standalone: true,
})
export class HomePanelComponent implements OnInit, OnDestroy {

    private firstSubscription: Subscription;
    private secondSubscription: Subscription;
    private thirdSubscription: Subscription;
    private forthSubscription: Subscription;
    private homeMyFoldersFlag: string;

    private folderService = inject(FolderService);
    private router = inject(Router);
    private activeRoute = inject(ActivatedRoute);
    private folderArrays = inject(FolderArrays);
    private flag = inject(Flag);
    private fileService = inject(FileService);
    private paginatorPageIndex = inject(PaginatorPageIndex);

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


    ngOnInit(): void {
        this.firstSubscription = this.setAllFoldersFromSubject();
        this.forthSubscription = this.setPageOptionsFromSubject();
        this.setFlagFromSubject();

    }

    handlePageEvent(e: PageEvent): void {

        this.setFlagFromSubject();
        this.pageEvent = e;


        this.length = e.length;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
        this.getFolders(this.homeMyFoldersFlag, this.pageIndex, this.pageSize);
        console.log(this.homePanelFolders);
    }

    /**
     * I set here the param in the URL, but I can't get here the param from the url after I set it.
     * I will retrieve the param from the URL in FolderInfoPanelComponent component because
     * then new navigate path is set to that component and there I can get the param that I set here
     *
     * I use the i parameter here to set active row when I click the row
     * */
    getFolderPictures(folderId: string, folderName: string): void {
        console.log(`Selected folder id: ${folderId}`);
        this.router.navigate(['pictures', folderId], {relativeTo: this.activeRoute});

        this.htmlIndex = folderId;

        const folderInfo: FolderInfo = {
            folderId: folderId,
            folderName: folderName
        }

        this.paginatorPageIndex.resetPageIndex.next(true);

        this.folderArrays.selectedFolder.next(folderInfo);

        this.fileService.getFolderFilesWithPagination(folderId, 0, 6).subscribe();

    }

    private getFolders(activeLink: string, pageIndex: number, pageSize: number) {
        switch (activeLink) {
            case Flags.HOME:
                this.getAllFoldersWithPagination(pageIndex, pageSize);
                this.secondSubscription = this.setAllFoldersFromSubject();
                break;
            case Flags.MY_FOLDERS:
                this.getUserFoldersWithPagination(pageIndex, pageSize);
                this.thirdSubscription = this.setAllFoldersFromSubject();
                break;
        }
    }

    private getUserFoldersWithPagination(pageIndex: number, pageSize: number): void {
        this.folderService.getUserFoldersWithPagination('434830067258757412', pageIndex, pageSize)
            .subscribe(response => {
                console.log(response);
                this.homePanelFolders = response.folderResponses;
            })
    }

    private getAllFoldersWithPagination(pageIndex: number, pageSize: number): void {
        this.folderService.getAllFoldersWithPagination(pageIndex, pageSize)
            .subscribe(response => {
                console.log(response);
            })
    }

    //no need to unsubscribe here since the take(1) function will automatically unsubscribe
    private setFlagFromSubject() {
        this.flag.homeMyFoldersFlag
            .pipe(
                skipWhile(x => x === null || x === undefined),
                take(1)
            )
            .subscribe(flag => {
                this.homeMyFoldersFlag = flag;
                console.log(`The flag is: ` + this.homeMyFoldersFlag + `  !!!!!`);
            });
    }


    private setAllFoldersFromSubject(): Subscription {
        return this.folderArrays.allFoldersSubject
            .subscribe(allFoldersArray => {
                console.log(`+++++++++++++ ` + allFoldersArray)
                this.homePanelFolders = allFoldersArray
            });
    }

    //TODO: Now is BehaviourSubject and not Subject
    private setPageOptionsFromSubject(): Subscription {
        return this.folderArrays.pageOptionsSubject.subscribe(x => {
            if (x != null) {
                this.pageIndex = x.pageIndex;
                this.pageSize = x.pageSize;
                this.length = x.length;
            }
        })
    }

    ngOnDestroy(): void {
        this.firstSubscription.unsubscribe();
        this.secondSubscription.unsubscribe();
        this.thirdSubscription.unsubscribe();
        this.forthSubscription.unsubscribe();
    }

}
