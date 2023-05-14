import {BehaviorSubject, Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {FolderResponse, PageOptions} from "../model/folder";
import {FolderInfo} from "../model/folderInfo";
import {FileResponse} from "../model/fileResponse";
import {FileResponsePagination} from "../model/fileResponsePagination";

export class SecurityUser {

    constructor(public id: string, public email: string, public username: string) {
    }
}

@Injectable({providedIn: 'root'})
export class SecurityContext {
    securityUser = new BehaviorSubject<SecurityUser>(null);
}

@Injectable({providedIn: 'root'})
export class ErrorMsg {
    errorMessage = new Subject<string>;
    deleteFolderErrorMessage = new Subject<string>();
}

@Injectable({providedIn: 'root'})
export class FolderArrays {

    allFoldersSubject = new Subject<Array<FolderResponse>>();
    pageOptionsSubject = new BehaviorSubject<PageOptions>(null);
    selectedFolder = new BehaviorSubject<FolderInfo>(null);
}

@Injectable({providedIn: 'root'})
export class Flag {
    homeMyFoldersFlag = new BehaviorSubject<string>(undefined);
    deleteFlag = new BehaviorSubject<string>(undefined)
}


@Injectable({providedIn: 'root'})
export class FileResp {
    fileResponse = new Subject<FileResponsePagination>();
}

@Injectable({providedIn: "root"})
export class PaginatorPageIndex {
    resetPageIndex = new Subject<boolean>();
}



export enum Flags {
    HOME = 'home',
    MY_FOLDERS = 'myFolders',
    PROFILE = 'profile',
    DELETE = 'delete'

}


