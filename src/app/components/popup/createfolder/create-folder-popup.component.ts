import {Component, inject, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FolderService} from "../../../services/gateway/folderService";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {NgSwitchCase} from "@angular/common";
import {MatRadioModule} from "@angular/material/radio";

/**
 * https://material.angular.io/components/dialog/overview
 * */

@Component({
    selector: "app-create-folder-popup",
    templateUrl: "./createFolderPopup.html",
    styleUrls: ["./createFolderPopup.css"],
    imports: [
        FontAwesomeModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatRadioModule,
        FormsModule,
    ],
    standalone: true
})
export class CreateFolderPopupComponent implements OnInit{


    radioValue: string;
    folderForm: FormGroup;
    private dialogRef = inject(MatDialogRef<CreateFolderPopupComponent>);
    private folderService = inject(FolderService);


    ngOnInit(): void {
        this.folderForm = new FormGroup({
            'folderName': new FormControl(null)
        });
    }

    closePopUp(): void {
        this.dialogRef.close();
    }

    createFolder(): void {
        const folderName = this.folderForm.value.folderName;
        console.log(folderName);
        console.log(this.radioValue + ` ++++++++++++++++`)
        this.folderService.createFolder(folderName, this.radioValue).subscribe(
            response => console.log(`folder created status is: ${response.status}`)
        );
    }
}
