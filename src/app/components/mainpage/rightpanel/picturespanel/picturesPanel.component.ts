import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {FileHandle} from "../../../../model/file-handle.model";
import {Image} from "../../../../model/image";
import {FileResp, FolderArrays} from "../../../../cach/cach";
import {Router} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ImageService} from "../../../../services/image.service";
import {DragDropDirective} from "../../../../directives/dragdrop/dragDrop.directive";
import {Subscription} from "rxjs";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CustomPaginatorComponent} from "./paginator/customPaginator.component";
import {MatDialog} from "@angular/material/dialog";
import {EnlargeImagePopupComponent} from "../../../popup/image/enlarge-image-popup.component";

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
        NgStyle,
        MatPaginatorModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        CustomPaginatorComponent,
    ],
    standalone: true
})
export class PicturesPanelComponent implements OnInit, OnDestroy {

    private firstSub: Subscription;
    nrOfFiles: number;
    fileImg: SafeUrl [] = [];
    mouseCursor: string;
    image: Image = {
        folderInfo: null,
        imageFile: []
    }

    @ViewChild(CustomPaginatorComponent, {static: true})
    paginator: CustomPaginatorComponent

    constructor(private router: Router,
                private sanitizer: DomSanitizer,
                private imageService: ImageService,
                private folderArray: FolderArrays,
                private fileResp: FileResp,
                private matDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.firstSub = this.fileResp.fileResponse.subscribe(response => {
            this.fileImg = [];
            response.fileResponses.forEach(file => {
                // console.log(file.fileName + '++++++++++++')
                this.fileImg.push(this.sanitizer.bypassSecurityTrustUrl(`data:${file.fileFormat};base64,` + file.file));
            });
            console.log(`------- elements:` + this.fileImg.length)

            this.paginator.length = response.totalElements;

        });
    }


    removeImage(fileIndex: number) {
        this.image.imageFile.splice(fileIndex, 1);
        this.nrOfFiles--;
    }


    onFileSelected(event: Event) {
        console.log(event);
        const target = event.target as HTMLInputElement;
        const folderInfo = this.folderArray.selectedFolder.value

        if (folderInfo === null) {
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
        if (folderInfo === null) {
            alert('Select a folder first, before uploading files!');
            return;
        }
        console.log(`Folder selected id: -> ${folderInfo.folderId} and folderName: ${folderInfo.folderName}`);

        this.image.folderInfo = folderInfo;
        $event.imageFile.forEach(file => this.image.imageFile.push(file));
        this.nrOfFiles = this.image.imageFile.length;
    }


    onMouseOver() {
        this.mouseCursor = 'pointer';
    }

    ngOnDestroy(): void {
        this.firstSub.unsubscribe();

    }

    enlargeImage(file: SafeUrl) {
        this.matDialog.open(EnlargeImagePopupComponent, {
            height: '40rem',
            width: '70rem',
            data: {
                message: file
            }
        });
    }
}
