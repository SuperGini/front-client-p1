import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {map, take} from "rxjs";
import {SecurityContext} from "../cach/cach";

@Injectable({providedIn: 'root'})
export class AuthGuardService {

    constructor(private securityContext: SecurityContext, private router: Router) {
    }

    canActivate() {
        return this.securityContext.securityUser
            .pipe(
                take(1), //takes 1 value and automatically unsubscribes
                map(user => {
                    if (user != null) {
                        return true;
                    }
                    return this.router.createUrlTree(['/login']);
                }
        ));
    }
}


export const canActivateLogin: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    return inject(AuthGuardService).canActivate();
}
