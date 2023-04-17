import {Component, OnInit} from "@angular/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FolderInfoPanelComponent} from "./folderinfopanel/folderInfoPanel.component";
import {PicturesPanelComponent} from "./picturespanel/picturesPanel.component";
import { Router, RouterOutlet} from "@angular/router";
import {FileHandle} from "../../../model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageService} from "../../../services/image.service";
import {Image} from "../../../model/image";
import {SecurityContext, SecurityUser} from "../../../cach/cach";

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


  username:string = 'username';

  image: Image = {
    imageInfo: '',
    imageFile: []
  }


  constructor(private router: Router,
              private sanitizer: DomSanitizer,
              private imageService: ImageService,
              private securityContext: SecurityContext) {
  }


  ngOnInit(): void {
    this.username = this.securityContext.securityUser.value.username;
  }



  onFileSelected(event: Event){
    console.log(event);
    const target = event.target as HTMLInputElement;
    if(target.files){
      const file = target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.image.imageFile.push(fileHandle);
      this.image.imageInfo = "PLM merge";

    }
  }

  addImage(){

    const uploadImgData = this.prepareFormData(this.image);
    this.imageService.saveImage(uploadImgData)
      .subscribe((response) => {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx")
      }
    )

  }

  prepareFormData(image: Image): FormData {
    const formData = new FormData();
    formData.append(
      'imageInfo',
      new Blob([JSON.stringify(image)], {type: 'application/json'} )
    );

    for (const element of image.imageFile) {
      formData.append(
        'imageFile',
        element.file,
        element.file.name
      );
    }
    return formData;
  }

}
