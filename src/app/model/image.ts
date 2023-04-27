import {FileHandle} from "./file-handle.model";
import {FolderInfo} from "./folderInfo";

export interface Image {

  folderInfo: FolderInfo,
  imageFile: FileHandle[];

}
