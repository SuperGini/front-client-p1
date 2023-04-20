import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CreateFolderPopupComponent} from "../../popup/createfolder/create-folder-popup.component";
import {Flag, Flags, FolderArrays} from "../../../cach/cach";
import {NgClass} from "@angular/common";
import {FolderService} from "../../../services/gateway/folderService";
import {DeleteFolderPopupComponent} from "../../popup/deletefolder/delete-folder-popup.component";
import {Subscription} from "rxjs";


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
export class LeftPanelComponent implements OnInit, OnDestroy{

    private firstSubscription: Subscription;
    private secondSubscription: Subscription;

    private matDialog = inject(MatDialog);
    private flag = inject(Flag);
    private folderService = inject(FolderService);


    activeLink: string
    deleteLink: string;


    ngOnInit(): void {
        this.setHomeFlagAndGetAllFolders();
        this.firstSubscription = this.flag.homeMyFoldersFlag
                                        .subscribe(flag => this.activeLink = flag);
        this.secondSubscription = this.flag.deleteFlag
                                        .subscribe( delFlag => this.deleteLink = delFlag);

    }

    openCreateFolderDialog() {
        this.matDialog.open(CreateFolderPopupComponent, {
            height: '40rem',
            width: '70rem'
        })
    }

    home(){
        this.setHomeFlagAndGetAllFolders();
    }

    myFolders(){
        this.flag.homeMyFoldersFlag.next('myFolders');
        this.folderService.getUserFoldersWithPagination('434830067258757412', 0,6)
                          .subscribe();
    }

    delete() {
        this.flag.deleteFlag.next(Flags.DELETE);
        this.matDialog.open(DeleteFolderPopupComponent, {
            height: '40rem',
            width:'70rem'
        })
    }

    profile() {
        this.activeLink = Flags.PROFILE;
    }

    private setHomeFlagAndGetAllFolders(){
        this.flag.homeMyFoldersFlag.next('home');
        this.folderService.getAllFoldersWithPagination(0, 6)
            .subscribe();
    }

    ngOnDestroy(): void {
        this.firstSubscription.unsubscribe();
        this.secondSubscription.unsubscribe();
    }



}
