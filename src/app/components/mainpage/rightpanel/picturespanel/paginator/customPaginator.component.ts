import {
    _MatPaginatorBase,
    MAT_PAGINATOR_DEFAULT_OPTIONS,
    MatPaginatorDefaultOptions, MatPaginatorIntl
} from "@angular/material/paginator";
import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {FileService} from "../../../../../services/gateway/fileService";
import {PaginatorPageIndex} from "../../../../../cach/cach";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PAGE_ELEMENTS} from "../../../../../constants/app.constants";

/**
 * https://stackoverflow.com/questions/70787342/how-can-i-style-mat-paginator-angular-as-shown
 * https://stackblitz.com/edit/angular-zxv5i2-9wc2z3?file=src%2Fapp%2Ftable-filtering-example.ts
 * */

@Component({
    selector: "app-paginator",
    templateUrl: "./paginator.html",
    styleUrls: ["./paginator.css"],
    imports: [
        MatButtonModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        NgForOf,
        FontAwesomeModule
    ],
    standalone: true
})
export class CustomPaginatorComponent extends _MatPaginatorBase<MatPaginatorDefaultOptions> implements OnInit, OnDestroy{

    private firstSub: Subscription;

    constructor(
        private fileService: FileService,
        private intl: MatPaginatorIntl,
        private changeDetectorRef: ChangeDetectorRef,
        private paginatorPageIndex: PaginatorPageIndex,
        private router: Router,
        @Optional() @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS) defaults?:
            MatPaginatorDefaultOptions,
        ) {
        super(intl, changeDetectorRef, defaults);
    }

    ngOnInit(): void {
        this.firstSub = this.paginatorPageIndex
                                        .resetPageIndex
                                        .subscribe(() => this.pageIndex = 0);

        this.pageSize = PAGE_ELEMENTS;
    }

    emitPageEvent(nextPage:any)
    {
        this.pageIndex = +nextPage
        this.page.emit({
            pageIndex: this.pageIndex,
            pageSize: +this.pageSize,
            length: this.length,
        });
        console.log(`+++ pageIndex: ` + this.pageIndex, + `++ pageSize: ` + this.pageSize);
    }

    xxxNext() {
        const folderId = this.getFolderId();
        if(this.hasNextPage()){
            this.fileService.getFolderFilesWithPagination(folderId, this.pageIndex + 1, PAGE_ELEMENTS)
                .subscribe();
        }
    }

    yyyPrevious() {
        const folderId = this.getFolderId();
        console.log(`++++: ` + this.pageIndex)
            this.fileService.getFolderFilesWithPagination(folderId, this.pageIndex, PAGE_ELEMENTS)
                .subscribe();
    }

    private getFolderId() {
        return this.router.url
            .split("/")
            .pop()
            .trim();
    }

    ngOnDestroy(): void {
        this.firstSub.unsubscribe();
    }
}
