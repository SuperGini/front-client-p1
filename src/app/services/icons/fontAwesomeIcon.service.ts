import {Injectable} from "@angular/core";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {
  faHouse,
  faTrashCan,
  faUser,
  faFolder,
  faFolderPlus,
  faMagnifyingGlass,
  faFilePdf,
  faImage,
  faFilm,
  faSdCard,
  faEllipsis,
  faArrowDown,
  faFile,
  faCirclePlay,
  faFileLines,
  faAngleLeft, faAngleRight, faGear, faCloudArrowDown, faCircleXmark
} from "@fortawesome/free-solid-svg-icons";



@Injectable({providedIn: 'root'})
export class FontAwesomeIconService {

    constructor(private library: FaIconLibrary) {
    }

    loadIcons() {
        this.library.addIcons(
            faHouse,
            faFolder,
            faUser,
            faTrashCan,
            faFolderPlus,
            faMagnifyingGlass,
            faFilePdf,
            faImage,
            faFilm,
            faSdCard,
            faEllipsis,
            faArrowDown,
            faFile,
            faCirclePlay,
            faFileLines,
            faAngleLeft,
            faAngleRight,
            faGear,
            faCloudArrowDown,
            faCircleXmark
        );
    }
}
