import {Component} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
    selector: "app-delete-folder",
    templateUrl: "./deleteFolderPopup.html",
    styleUrls: ["./deleteFolderPopup.css"],
    imports: [
        FontAwesomeModule
    ],
    standalone: true
})
export class DeleteFolderPopupComponent {

}
