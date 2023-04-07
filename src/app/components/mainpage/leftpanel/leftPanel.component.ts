import {Component, inject} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CreateFolderPopupComponent} from "../../popup/createfolder/create-folder-popup.component";


@Component({
    selector: "app-left-panel",
    templateUrl: "./leftPanel.html",
    styleUrls: ["./leftPanel.css"],
    imports: [
        FontAwesomeModule,
        MatDialogModule //this module must be defined in main.ts too
    ],
    standalone: true
})
export class LeftPanelComponent {

    matDialog = inject(MatDialog);


    openDialog() {
        this.matDialog.open(CreateFolderPopupComponent, {
            height: '400px',
            width: '700px'
        })
    }

}
