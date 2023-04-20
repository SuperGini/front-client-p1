import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {FolderRequest, FolderResponse, FolderResponsePagination, PageOptions} from "../../model/folder";
import {ErrorMsg, Flag, Flags, FolderArrays, SecurityContext} from "../../cach/cach";
import {
    APPLICATION_JSON_VALUE,
    CONTENT_TYPE,
    DELETE_FOLDER,
    GET_FOLDERS_PAGE,
    POST_CREATE_FOLDER
} from "../../constants/app.constants";
import {catchError, map, mergeMap, Observable, tap, throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class FolderService {


    private httClient = inject(HttpClient);
    private securityContext = inject(SecurityContext);
    private error = inject(ErrorMsg);
    private arrayFolders = inject(FolderArrays);
    private flag = inject(Flag);


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

    getUserFoldersWithPagination(userId: string, pageNumber: number, pageElements: number): Observable<FolderResponsePagination> {

        const httpHeaders = new HttpHeaders()
            .append(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        return this.httClient.get<FolderResponsePagination>(
            GET_FOLDERS_PAGE + `/${userId}/${pageNumber}/${pageElements}`,
            {headers: httpHeaders}
        )
            .pipe(
                map(response => this.convert(response)),
                tap(convertedResponse => {
                        this.arrayFolders.allFoldersSubject.next(convertedResponse.folderResponses);
                        const pageOptions: PageOptions = {
                            pageIndex: pageNumber,
                            pageSize: pageElements,
                            length: convertedResponse.totalElements,
                        }
                        this.arrayFolders.pageOptionsSubject.next(pageOptions)
                    }
                ),
                catchError(this.createFolderErrorHandler.bind(this))
            );
    }

    getAllFoldersWithPagination(pageNumber: number, pageElements: number): Observable<FolderResponsePagination> {
        const httpHeaders = new HttpHeaders()
            .append(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        return this.httClient.get<FolderResponsePagination>(
            GET_FOLDERS_PAGE + `/${pageNumber}/${pageElements}`,
            {headers: httpHeaders}
        )
            .pipe(
                map(response => this.convert(response)),
                tap(convertedResponse => {
                        this.arrayFolders.allFoldersSubject.next(convertedResponse.folderResponses);

                        const pageOptions: PageOptions = {
                            pageIndex: pageNumber,
                            pageSize: pageElements,
                            length: convertedResponse.totalElements,
                        }
                        this.arrayFolders.pageOptionsSubject.next(pageOptions)
                    }
                ),
                catchError(this.createFolderErrorHandler.bind(this))
            );
    }

    deleteFolder(folderId: string, userId: string): Observable<FolderResponsePagination> {
        const httpHeaders = new HttpHeaders()
            .append(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        return this.httClient.delete<number>(
            DELETE_FOLDER + `/${folderId}/${userId}`,
            {headers: httpHeaders}
        )
            .pipe(
                mergeMap(() => {
                    const flag = this.flag.homeMyFoldersFlag.value;
                    const options = this.arrayFolders.pageOptionsSubject.value;
                    const pageIndex = options.pageIndex;
                    const pageSize = options.pageSize;

                    console.log('pageIndex: ' + pageIndex + '  ' + 'pageSize: ' + pageSize);
                    console.log(flag + ` <----------------this is the flag`)

                    if (Flags.MY_FOLDERS === flag) {
                        return this.getUserFoldersWithPagination('434830067258757412', pageIndex, pageSize);
                    }

                    return this.getAllFoldersWithPagination(pageIndex, pageSize);

                }),
                catchError(this.deleteFolderErrorHandler.bind(this))
            );

    }

    private convert(page: FolderResponsePagination): FolderResponsePagination {
        const fff = new Array<FolderResponse>;

        page.folderResponses.forEach(x => {
            x.createDate = this.formatDateString(x.createDate);
            x.updateDate = this.formatDateString(x.updateDate);
            fff.push(x);
        })
        page.folderResponses = fff;

        return page;
    }

    private formatDateString(dateString: string): string {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }


    private createFolderErrorHandler(error: HttpErrorResponse) {
        let errorMessage: string;
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


    private deleteFolderErrorHandler(error: HttpErrorResponse) {
        let errorMessage: string;
        console.log(`error in deleting folder, httpStatus: ${error.status}`)

        switch (error.status) {
            case 400:
                errorMessage = error.error.errorMessages;
                break;
            case 404:
                errorMessage = error.error.errorMessages;
                break;
            default:
                errorMessage = 'Server Error - WTF:))?';
        }

        this.error.deleteFolderErrorMessage.next(errorMessage);

        return throwError(() => errorMessage);
    }

}
