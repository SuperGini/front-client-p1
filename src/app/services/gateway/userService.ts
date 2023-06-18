import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable, OnInit} from "@angular/core";
import {User} from "../../model/user";
import {APPLICATION_JSON_VALUE, CONTENT_TYPE, POST_USER_CREATE, POST_USER_LOGIN} from "../../constants/app.constants";
import {catchError, Observable, tap, throwError} from "rxjs";
import {UserLogin} from "../../model/userLogin";
import {ErrorMsg, SecurityContext, SecurityUser} from "../../cach/cach";
import {Store} from "@ngrx/store";


@Injectable({providedIn: 'root'})
export class UserService implements OnInit {

    user: Observable<{ securityUser: SecurityUser }>;

    constructor(private httpClient: HttpClient,
                private securityContext: SecurityContext,
                private error: ErrorMsg,
                private store: Store<{ addLoggedUser: { securityUser: SecurityUser } }>
    ) {
    }

    ngOnInit(): void {
        this.user = this.store.select('addLoggedUser');
        console.log(this.user)
    }


    createUser(user: User): Observable<HttpResponse<User>> {
        const requestUser = JSON.stringify(user);

        const headers = new HttpHeaders()
            .append(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        return this.httpClient.post<User>(
            POST_USER_CREATE,
            requestUser,
            {headers: headers, observe: 'response'}
        )
            .pipe(catchError(this.createUserErrorHandler.bind(this)));
    }


    loginUser(user: UserLogin) {
        const requestUser = JSON.stringify(user);

        const headers = new HttpHeaders()
            .append(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        return this.httpClient.post<User>(
            POST_USER_LOGIN,
            requestUser,
            {headers: headers, observe: 'response'}
        )
            .pipe(catchError(this.loginUserErrorHandler.bind(this)),
                tap(response => {
                    console.log(response);
                    console.log(response.body.username);
                    const securityUser = new SecurityUser(
                        response.body.id,
                        response.body.email,
                        response.body.username
                    );
                    console.log(`User logged is: ${securityUser.id}`);

                    this.securityContext.securityUser.next(securityUser);
                    localStorage.setItem('username', response.body.username);
                    localStorage.setItem('userId', response.body.id);
                })
            );
    }


    private createUserErrorHandler(error: HttpErrorResponse) {
        console.log(`login http error status: ${error.status}`)
        let errorMessage;

        switch (error.status) {
            case 400:
                errorMessage = 'Invalid: username/email';
                break;
            case 409:
                errorMessage = 'Unable to create user username/email already used'
                break;
            default:
                errorMessage = 'Server Error - WTF:))?';
        }

        this.error.errorMessage.next(errorMessage);

        return throwError(() => new Error(errorMessage));
    }

    private loginUserErrorHandler(error: HttpErrorResponse) {
        console.log(`login http error status: ${error.status}`)
        let errorMessage;

        switch (error.status) {
            case 400:
                errorMessage = 'Invalid: username/email';
                break;
            default:
                errorMessage = 'Server Error - WTF:))?';
        }

        this.error.errorMessage.next(errorMessage);

        return throwError(() => new Error(errorMessage));
    }

}
