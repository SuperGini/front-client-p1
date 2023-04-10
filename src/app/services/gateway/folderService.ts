import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {FolderRequest, FolderResponse, FolderResponsePagination} from "../../model/folder";
import {ErrorMsg, SecurityContext} from "../../cach/cach";
import {
    APPLICATION_JSON_VALUE,
    CONTENT_TYPE,
    GET_FOLDERS_PAGE,
    POST_CREATE_FOLDER
} from "../../constants/app.constants";
import {catchError, map, Observable, take, throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class FolderService {

    private httClient = inject(HttpClient);
    private securityContext = inject(SecurityContext);
    private error = inject(ErrorMsg);

    createFolder(folderName: string, folderType: string) {

        const userId = this.securityContext.securityUser.value.id;
        console.log(`id----------->: ${this.securityContext.securityUser.getValue().id}`)


        const httpHeaders = new HttpHeaders()
            .append(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        const createFolderRequest: FolderRequest = {
            projectName: folderName,
            userId: userId,
            folderType: folderType

        }

        console.log(`creating folder with user id: ${userId} and folderName: ${folderName}`);

        return this.httClient.post<FolderResponse>(
            POST_CREATE_FOLDER,
            createFolderRequest,
            {headers: httpHeaders, observe: 'response'}
        )
            .pipe(catchError(this.createFolderErrorHandler.bind(this)));
    }

    /**
     * VERY IMPORTANT!!!!
     * if I add in options -> observe: 'response'
     * then the http call will return an HttpResponse the wraps the response body
     * to get the body i need to call -> response.body
     * Observable<HttpResponse<FolderResponsePagination>>
     * Ex: is the same thing like in Spring where the client call will return a ResponseEntity end I get the body
     * from that.
     * If I want to get the FolderResponsePagination object directly from the http call just dont add -> observe: 'response'
     * in options
     * */

    getFoldersWithPagination(userId: string, pageNumber: number, pageElements: number): Observable<FolderResponsePagination> {

        const httpHeaders = new HttpHeaders()
            .append(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        return this.httClient.get<FolderResponsePagination>(
            GET_FOLDERS_PAGE + `/${userId}/${pageNumber}/${pageElements}`,
            {headers: httpHeaders}
        )
        .pipe(
            map(response => this.convert(response)),
            catchError(this.createFolderErrorHandler.bind(this)));
    }

    private convert(page: FolderResponsePagination): FolderResponsePagination{
        const fff = new Array<FolderResponse>;

        page.folderResponses.forEach(x => {
                x.createDate = this.formatDateString(x.createDate);
                x.updateDate = this.formatDateString(x.updateDate);
                fff.push(x);
        })
        page.folderResponses = fff;

        return page;
    }

    private formatDateString (dateString: string): string {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }



    private createFolderErrorHandler(error: HttpErrorResponse) {
        let errorMessage;
        console.log(`error in creating folder, httpStatus: ${error.status}`)

        switch (error.status) {
            case 400:
                errorMessage = 'Bad Request';
                break;
            case 404:
                errorMessage = 'User id not found';
                break;
            default:
                errorMessage = 'Server Error - WTF:))?';
        }

        this.error.errorMessage.next(errorMessage);

        return throwError(() => new Error());
    }


}
