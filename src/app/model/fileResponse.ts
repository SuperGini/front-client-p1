export class FileResponse {

     id: string;
     fileName: string;
     fileFormat: string;
     folderId: string;
     file: string;

    constructor(id, fileName, fileFormat, folderId, file) {
        this.id = id;
        this.fileName = fileName;
        this.fileFormat = fileFormat;
        this.folderId = folderId;
        this.file = file;
    }
}



