import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Navigating} from "../../interfaces";
import {Router} from "@angular/router";
import {User} from "../../../model/user";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/gateway/userService";
import {Subscription} from "rxjs";
import {NgIf} from "@angular/common";
import {ErrorMsg} from "../../../cach/cach";


@Component({
    selector: 'app-create2',
    templateUrl: './create-user.html',
    styleUrls: ['./create-user.css'],
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
    standalone: true
})
export class CreateUserComponent implements OnInit, Navigating, OnDestroy {

    signupForm: FormGroup;

    errorMessage: string = null;
    successMessage: string = null;
    private errorSub: Subscription;


    constructor(private router: Router, private httpClient: HttpClient, private clientService: UserService, private error: ErrorMsg) {
    }

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            username: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required]),
            password: new FormControl(null, Validators.required)
        });
            //don't forget to unsubscribe -> memory leaks
        this.errorSub = this.error.errorMessage.subscribe(error => {
            this.errorMessage = error;
        });
    }

    onSubmit() {
        const username = this.signupForm.value.username;
        const email = this.signupForm.value.email;
        const password = this.signupForm.value.password;

        let user: User = {
            username: username,
            email: email,
            password: password
        }

        this.resetMessages();

        this.clientService.createUser(user)
                            .subscribe(response => this.validateStatus(response.status));
    }

    toLoginPage(): void {
        this.router.navigate(['/login']);
    }

    ngOnDestroy(): void {
        this.errorSub.unsubscribe();
    }

    validateStatus(httpStatus: number) : void {
        if(httpStatus === 201){
            this.successMessage = "User created!"
        }
    }

    private resetMessages(){
        this.errorMessage = null;
        this.successMessage = null;
    }

}
