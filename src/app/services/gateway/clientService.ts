import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "../../model/user";
import {APPLICATION_JSON_VALUE, CONTENT_TYPE, POST_USER_CREATE, POST_USER_LOGIN} from "../../constants/app.constants";
import {BehaviorSubject, catchError, Observable, Subject, tap, throwError} from "rxjs";
import {UserLogin} from "../../model/userLogin";
import {SecurityUser} from "../../cach/cach";


@Injectable({providedIn: 'root'})
export class ClientService {

    error = new Subject<string>;
    securityUser = new BehaviorSubject<SecurityUser>(null);

    constructor(private httpClient: HttpClient) {
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
                    console.log(response.username);
                    const securityUser = new SecurityUser(
                        response.id,
                        response.email,
                        response.username
                    );
                    this.securityUser.next(securityUser);
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

        this.error.next(errorMessage);

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

        this.error.next(errorMessage);

        return throwError(() => new Error(errorMessage));
    }

}
