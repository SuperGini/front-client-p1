import {BehaviorSubject, Subject} from "rxjs";
import {Injectable} from "@angular/core";

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


