import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "../../model/user";
import {APPLICATION_JSON_VALUE, CONTENT_TYPE, POST_USER_CREATE, POST_USER_LOGIN} from "../../constants/app.constants";
import {BehaviorSubject, catchError, Observable, Subject, tap, throwError} from "rxjs";
import {UserLogin} from "../../model/userLogin";
import {ErrorMsg, SecurityContext, SecurityUser} from "../../cach/cach";


@Injectable({providedIn: 'root'})
export class UserService {

   // error = new Subject<string>;

    constructor(private httpClient: HttpClient, private securityContext: SecurityContext, private error: ErrorMsg) {
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
