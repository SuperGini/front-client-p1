import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {FolderRequest, FolderResponse} from "../../model/folder";
import {ErrorMsg, SecurityContext} from "../../cach/cach";
import {APPLICATION_JSON_VALUE, CONTENT_TYPE, POST_CREATE_FOLDER} from "../../constants/app.constants";
import {catchError, map, take, throwError} from "rxjs";

@Injectable({providedIn: 'root'})
export class FolderService {

    private httClient = inject(HttpClient);
    private securityContext = inject(SecurityContext);
    private error = inject(ErrorMsg);

    createFolder(folderName: string) {


        console.log()

        const userId = this.securityContext.securityUser.value.id;
        console.log(`id----------->: ${this.securityContext.securityUser.getValue().id}`)


        const httpHeaders = new HttpHeaders()
            .append(CONTENT_TYPE, APPLICATION_JSON_VALUE);

        const createFolderRequest: FolderRequest = {
            projectName: folderName,
            userId: userId
        }

        console.log(`creating folder with user id: ${userId} and folderName: ${folderName}`);

        return this.httClient.post<FolderResponse>(
            POST_CREATE_FOLDER,
            createFolderRequest,
            {headers: httpHeaders, observe: 'response'}
        )
            .pipe(catchError(this.createFolderErrorHandler.bind(this)))

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
            default:
                errorMessage = 'Server Error - WTF:))?';
        }

        this.error.errorMessage.next(errorMessage);

        return throwError(() => new Error());
    }


}
