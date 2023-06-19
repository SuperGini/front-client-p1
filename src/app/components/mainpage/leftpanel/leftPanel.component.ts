import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CreateFolderPopupComponent} from "../../popup/createfolder/create-folder-popup.component";
import {Flag, Flags, FolderArrays} from "../../../cach/cach";
import {NgClass} from "@angular/common";
import {FolderService} from "../../../services/gateway/folderService";
import {DeleteFolderPopupComponent} from "../../popup/deletefolder/delete-folder-popup.component";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";


@Component({
    selector: "app-left-panel",
    templateUrl: "./leftPanel.html",
    styleUrls: ["./leftPanel.css"],
    imports: [
        FontAwesomeModule,
        MatDialogModule,
        NgClass,
        //this module must be defined in main.ts too
    ],
    standalone: true
})
export class LeftPanelComponent implements OnInit, OnDestroy {

    private REGEX = /^[0-9]+$/;

    private firstSubscription: Subscription;
    private secondSubscription2: Subscription;

    private matDialog = inject(MatDialog);
    private flag = inject(Flag);
    private folderService = inject(FolderService);
    private router = inject(Router);
    private folderArray = inject(FolderArrays);


    activeLink: string
    deleteLink: string;


    ngOnInit(): void {
        this.setHomeFlagAndGetAllFolders();
        this.firstSubscription = this.flag.homeMyFoldersFlag
            .subscribe(flag => this.activeLink = flag);
        this.secondSubscription2 = this.flag.deleteFlag
            .subscribe(delFlag => this.deleteLink = delFlag);

    }

    openCreateFolderDialog() {
        this.matDialog.open(CreateFolderPopupComponent, {
            height: '40rem',
            width: '70rem'
        })
    }

    home() {
        this.setHomeFlagAndGetAllFolders();
    }

    myFolders() {
        const userId = localStorage.getItem('userId');
        this.flag.homeMyFoldersFlag.next('myFolders');
        this.folderService.getUserFoldersWithPagination(userId, 0, 6)
            .subscribe();
    }

    delete() {
        const folderId = this.router.url
            .split("/")
            .pop()
            .trim();

        if (this.isAnumber(folderId)) {
            this.flag.deleteFlag.next(Flags.DELETE);
            this.matDialog.open(DeleteFolderPopupComponent, {
                height: '40rem',
                width: '70rem'
            })
        } else {
            throw new Error(`${folderId} is not a number`);
        }
    }

    profile() {
        this.activeLink = Flags.PROFILE;
    }

    private setHomeFlagAndGetAllFolders() {
        this.flag.homeMyFoldersFlag.next('home');
        this.folderService.getAllFoldersWithPagination(0, 6)
            .subscribe();
    }

    private isAnumber(value): boolean {
        return this.REGEX.test(value);
    }

    ngOnDestroy(): void {
        this.firstSubscription.unsubscribe();
        this.secondSubscription2.unsubscribe();
    }
}
