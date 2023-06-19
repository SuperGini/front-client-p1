import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDialogRef} from "@angular/material/dialog";
import {MatRippleModule} from "@angular/material/core";
import {Router} from "@angular/router";
import {FolderService} from "../../../services/gateway/folderService";
import {ErrorMsg, Flag, FolderArrays, SecurityContext} from "../../../cach/cach";
import {Subscription} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
    selector: "app-delete-folder",
    templateUrl: "./deleteFolderPopup.html",
    styleUrls: ["./deleteFolderPopup.css"],
    imports: [
        FontAwesomeModule,
        MatRippleModule,
        NgIf
    ],
    standalone: true
})
export class DeleteFolderPopupComponent implements OnInit, OnDestroy{

    folderName: string = '';
    errorMessage: string;

    private REGEX = /^[0-9]+$/;
    private firstSub: Subscription;
    private secondSub: Subscription;

    private matDialogRef = inject(MatDialogRef<DeleteFolderPopupComponent>);
    private router = inject(Router);
    private folderService = inject(FolderService);
    private securityContext = inject(SecurityContext);
    private error = inject(ErrorMsg);
    private flag = inject(Flag);
    private folderArray = inject(FolderArrays);

    ngOnInit(): void {
        this.folderName = this.folderArray.selectedFolder.value.folderName;
        this.firstSub = this.error.deleteFolderErrorMessage
                                    .subscribe(error => this.errorMessage = error);
        this.secondSub = this.matDialogRef.beforeClosed()
                                    .subscribe(() =>  this.flag.deleteFlag.next(undefined));
    }


    closePopUp(){
        this.flag.deleteFlag.next(undefined);
        this.matDialogRef.close();
    }

    deleteFolder(){
        console.log(this.router.url);
        const userId = this.securityContext.securityUser.value.id;
        const folderId = this.router.url
                                    .split("/")
                                    .pop()
                                    .trim();

        if(this.isNotANumber(folderId)){
            this.error.deleteFolderErrorMessage.next('Select a folder first to delete it!')
            throw Error(`Invalid folder Id to delete: ${folderId} -> is not a number!!`);
        }

        this.folderService.deleteFolder(folderId, userId)
            .subscribe(response => {
                    console.log(`Folder with id: ${folderId} was deleted!`);
                    this.flag.deleteFlag.next(undefined);
                    this.matDialogRef.close();
                    this.router.navigate(['/mainPage']);
            }
        );
    }

    private isNotANumber(value): boolean {
        return !this.REGEX.test(value);
    }

    ngOnDestroy(): void {
        this.firstSub.unsubscribe();
        this.secondSub.unsubscribe();
    }
 }
