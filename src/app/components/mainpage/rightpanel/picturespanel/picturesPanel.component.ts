import {Component} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {FileHandle} from "../../../../model/file-handle.model";
import {Image} from "../../../../model/image";
import {FolderArrays} from "../../../../cach/cach";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageService} from "../../../../services/image.service";
import {DragDropDirective} from "../../../../directives/dragdrop/dragDrop.directive";

@Component({
    selector: "app-pictures-panel",
    templateUrl: "./picturesPanel.html",
    styleUrls: ["./picturesPanel.css"],
    imports: [
        FontAwesomeModule,
        MatGridListModule,
        NgForOf,
        DragDropDirective,
        NgIf,
        NgStyle
    ],
    standalone: true
})
export class PicturesPanelComponent {

    nrOfFiles: number;

    image: Image = {
        folderInfo: null,
        imageFile: []
    }
    mouseCursor: string;


    constructor(private router: Router,
                private sanitizer: DomSanitizer,
                private imageService: ImageService,
                private folderArray: FolderArrays) {
    }

    removeImage(fileIndex: number) {
        this.image.imageFile.splice(fileIndex, 1);
        this.nrOfFiles--;
    }


    onFileSelected(event: Event) {
        console.log(event);
        const target = event.target as HTMLInputElement;
        const folderInfo = this.folderArray.selectedFolder.value

        if(folderInfo === null){
            alert('Select a folder first, before uploading files!');
            return;
        }

        if (target.files) {
            const fileArray = Array.from(target.files);

            fileArray.forEach(file => {
                const fileHandle: FileHandle = {
                    file: file,
                    url: this.sanitizer.bypassSecurityTrustUrl(
                        window.URL.createObjectURL(file)
                    )
                }
                this.image.imageFile.push(fileHandle);
            })

            console.log(`Folder selected id: -> ${folderInfo.folderId} and folderName: ${folderInfo.folderName}`);

            this.image.folderInfo = folderInfo;
        }
    }

    addImage() {
        const uploadImgData = this.prepareFormData(this.image);
        this.imageService.saveImage(uploadImgData)
            .subscribe((response) => {
                    console.log("image saved!!!!")
                }
            );
        this.image.imageFile = [];
        this.nrOfFiles = 0;
    }

    prepareFormData(image: Image): FormData {
        const formData = new FormData();
        formData.append(
            'folderInfo',
            new Blob([JSON.stringify(image.folderInfo)], {type: 'application/json'})
        );

        image.imageFile.forEach(element =>
            formData.append(
                'imageFile',
                element.file,
                element.file.name
            )
        );
        return formData;
    }

    dragDropFileSelected($event: Image) {
        const folderInfo = this.folderArray.selectedFolder.value
        if(folderInfo === null){
            alert('Select a folder first, before uploading files!');
            return;
        }
        console.log(`Folder selected id: -> ${folderInfo.folderId} and folderName: ${folderInfo.folderName}`);

        this.image.folderInfo = folderInfo;
        this.image.imageFile  = $event.imageFile;
        this.nrOfFiles = this.image.imageFile.length;

    }

    onMouseOver() {
        this.mouseCursor = 'pointer';
    }
}
