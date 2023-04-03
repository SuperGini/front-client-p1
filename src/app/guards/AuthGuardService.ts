import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {ClientService} from "../services/gateway/clientService";
import {map, take} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthGuardService {

    constructor(private clientService: ClientService, private router: Router) {
    }

    canActivate() {
        return this.clientService.securityUser
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
