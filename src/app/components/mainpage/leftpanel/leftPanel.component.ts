import {Component, inject, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CreateFolderPopupComponent} from "../../popup/createfolder/create-folder-popup.component";
import {Flag, Flags, FolderArrays} from "../../../cach/cach";
import {NgClass} from "@angular/common";
import {FolderService} from "../../../services/gateway/folderService";


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
export class LeftPanelComponent implements OnInit{

    private matDialog = inject(MatDialog);
    private flag = inject(Flag);
    private folderService = inject(FolderService);
    private folderArrays = inject(FolderArrays);

    activeLink: string


    ngOnInit(): void {
        this.setHomeFlagAndGetAllFolders();
    }

    openDialog() {
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
        this.activeLink = Flags.MY_FOLDERS;
        this.folderService.getUserFoldersWithPagination('434830067258757412', 0,6)
                          .subscribe();
    }

    delete() {
        this.activeLink = Flags.DELETE;
    }

    profile() {
        this.activeLink = Flags.PROFILE;
    }

    private setHomeFlagAndGetAllFolders(){
        this.flag.homeMyFoldersFlag.next('home');
        this.activeLink = Flags.HOME;
        this.folderService.getAllFoldersWithPagination(0, 6)
            .subscribe();
    }



}
