import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SafeUrl} from "@angular/platform-browser";

@Component({
    selector: "app-enlarge-image",
    templateUrl: "./enlargeImagePopup.html",
    styleUrls: ["./enlargeImagePopup.css"],
    standalone: true
})
export class EnlargeImagePopupComponent {

    imageFile: SafeUrl;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { message: SafeUrl }) {
        this.imageFile = data.message;
    }

}
