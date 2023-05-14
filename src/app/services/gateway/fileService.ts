import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {FileResponse} from "../../model/fileResponse";
import {APPLICATION_JSON_VALUE, CONTENT_TYPE, GET_FILES} from "../../constants/app.constants";
import {catchError, Observable, tap, throwError} from "rxjs";
import {ErrorMsg, FileResp} from "../../cach/cach";
import {FileResponsePagination} from "../../model/fileResponsePagination";

@Injectable({providedIn: 'root'})
export class FileService {

    private httpClient = inject(HttpClient);
    private error = inject(ErrorMsg);
    private fileResp = inject(FileResp);


    getFolderFilesWithPagination(folderId: string, pageIndex: number, pageElements: number): Observable<FileResponsePagination> {

        const httpHeaders = new HttpHeaders()
            .append(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        return this.httpClient.get<FileResponsePagination>(
            GET_FILES + `/${folderId}/${pageIndex}/${pageElements}`,
            {headers: httpHeaders}
        )
            .pipe(
                tap(response => {
                        this.fileResp.fileResponse.next(response);
                        response.fileResponses.forEach(x => console.log(x.fileName))
                    }
                ),
                catchError(this.getFileErrorHandler.bind(this))
            );
    }

    getFileErrorHandler(error: HttpErrorResponse) {
        let errorMessage: string = error.error.errorMessages;

        this.error.errorMessage.next(errorMessage);

        return throwError(() => new Error(errorMessage));
    }


}
