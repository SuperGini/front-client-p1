import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "../../model/user";
import {
    APPLICATION_JSON_VALUE,
    POST_USER_CREATE,
    CONTENT_TYPE,
    POST_USER_LOGIN
} from "../../constants/app.constants";
import {catchError, Observable, Subject, throwError} from "rxjs";


@Injectable({providedIn: 'root'})
export class ClientService {

    error = new Subject<string>;

    constructor(private httpClient: HttpClient) {
    }


    createUser(user: User):Observable<HttpResponse<User>>{
        const requestUser = JSON.stringify(user);

        const headers = new HttpHeaders()
                                        .append(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        return this.httpClient.post<User>(
                                        POST_USER_CREATE,
                                        requestUser,
                                        {headers: headers, observe: 'response'}
        )
        .pipe(catchError(this.handleError.bind(this)));
    }


    loginUser(user: User) {
        const requestUser = JSON.stringify(user);

        const headers = new HttpHeaders()
            .append(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        return this.httpClient.post<User>(
                                        POST_USER_LOGIN,
                                        requestUser,
                                        {headers: headers, observe: 'response'}
        )
            .pipe(catchError(this.handleError.bind(this)));
    }


    private handleError(error: HttpErrorResponse){

        let errorMessage;

        switch (error.status) {
            case 400:
                errorMessage = 'Bad request, invalid: username/email';
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

}
