import {Directive, EventEmitter, HostBinding, HostListener, Output} from "@angular/core";
import {FileHandle} from "../../model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {Image} from "../../model/image";

@Directive({
    selector: "[appDragdrop]",
    standalone: true
})
export class DragDropDirective {

    @Output()
    images: EventEmitter<Image> = new EventEmitter();


    @HostBinding("style.background")
    private background = "#fbfcfc";
    @HostBinding("style.border")
    private border = "3px solid #f39c12";
    @HostBinding("style.color")
    private color = '#b71c1c';

    constructor( private sanitizer: DomSanitizer) {
    }

    @HostListener("dragover", ["$event"])
    public onDragOver(evt: DragEvent){
        evt.preventDefault();
        evt.stopPropagation();
        this.background = "#e9f5fe";
        this.border = "3px solid #2ecc71";
        this.color = '#2ecc71';
    }

    @HostListener("dragleave", ["$event"])
    public onDragLeave(evt: DragEvent){
        evt.preventDefault();
        evt.stopPropagation();
        this.background = "#fbfcfc";
        this.border = "3px solid #f39c12";
        this.color = '#b71c1c';
    }

    @HostListener("drop", ["$event"])
    public onDrop(evt: DragEvent){
        evt.preventDefault();
        evt.stopPropagation();
        this.background = "#fbfcfc";
        this.border = "3px solid #f39c12";
        this.color = '#b71c1c';

        const image: Image = {
            folderInfo: null,
            imageFile: []
        }

        const files = evt.dataTransfer.files;

       Array.from(files)
           .forEach(file => {
              const fileHandle : FileHandle = {
                  file: file,
                  url: this.sanitizer.bypassSecurityTrustUrl(
                      window.URL.createObjectURL(file))
              }
              image.imageFile.push(fileHandle);

              this.images.emit(image);
           });
    }
}
