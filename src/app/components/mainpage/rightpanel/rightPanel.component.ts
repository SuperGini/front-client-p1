import {Component, inject, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FolderInfoPanelComponent} from "./folderinfopanel/folderInfoPanel.component";
import {PicturesPanelComponent} from "./picturespanel/picturesPanel.component";
import { Router, RouterOutlet} from "@angular/router";
import {FileHandle} from "../../../model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageService} from "../../../services/image.service";
import {Image} from "../../../model/image";
import {FolderArrays, SecurityContext} from "../../../cach/cach";

@Component({
  selector: "app-right-panel",
  templateUrl: "./rightPanel.html",
  styleUrls: ["./rightPanel.css"],
  imports: [
    FontAwesomeModule,
    FolderInfoPanelComponent,
    PicturesPanelComponent,
    RouterOutlet
  ],
  standalone: true
})
export class RightPanelComponent implements OnInit{

  folderArray = inject(FolderArrays);

  username:string = 'username';

  image: Image = {
    folderInfo: null,
    imageFile: []
  }


  constructor(private router: Router,
              private sanitizer: DomSanitizer,
              private imageService: ImageService,
              private securityContext: SecurityContext) {
  }


  ngOnInit(): void {
    //todo: delete if statement when app is fully functional -> wrote if statement so i dont have null error
    if(this.securityContext.securityUser.value != null){
      this.username = this.securityContext.securityUser.value.username;
    }

  }


  onFileSelected(event: Event){
    console.log(event);
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.image.imageFile = [];

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

      const folderInfo = this.folderArray.selectedFolder.value
      console.log(`Folder selected id: -> ${folderInfo.folderId} and folderName: ${folderInfo.folderName}`);

      this.image.folderInfo = folderInfo;

    }
  }

  addImage(){

    const uploadImgData = this.prepareFormData(this.image);
    this.imageService.saveImage(uploadImgData)
      .subscribe((response) => {
        console.log("image saved!!!!")
      }
    )
  }

  prepareFormData(image: Image): FormData {
    const formData = new FormData();

    formData.append(
      'folderInfo',
      new Blob([JSON.stringify(image.folderInfo)], {type: 'application/json'} )
    );

    image.imageFile.forEach(element =>
        formData.append(
            'imageFile',
            element.file,
            element.file.name
        )
    )
    return formData;

  }

}
