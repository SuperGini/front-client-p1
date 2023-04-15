import {BehaviorSubject, Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {FolderResponse, PageOptions} from "../model/folder";

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
}

@Injectable({providedIn: 'root'})
export class FolderArrays {

    allFoldersSubject = new Subject<Array<FolderResponse>>();
    pageOptionsSubject = new Subject<PageOptions>();
}

@Injectable({providedIn: 'root'})
export class Flag {
    homeMyFoldersFlag = new BehaviorSubject<string>(null);
}



export enum Flags {
    HOME = 'home',
    MY_FOLDERS = 'myFolders',
    PROFILE = 'profile',
    DELETE = 'delete'

}


