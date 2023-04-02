import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Navigating} from "../../interfaces";
import {ClientService} from "../../../services/gateway/clientService";
import {UserLogin} from "../../../model/userLogin";
import {Subscription} from "rxjs";
import {NgIf} from "@angular/common";
import {userCache} from "../../../cach/cach";
import {User} from "../../../model/user";

@Component({
    selector: 'app-login2',
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
    standalone: true
})
export class LoginComponent implements OnInit, OnDestroy, Navigating {

    loginForm: FormGroup;

    loginErrorMessage: string = null;
    private errorSub: Subscription;


    constructor(private router: Router, private clientService: ClientService) {
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl(null),
            password: new FormControl(null)
        });

        this.errorSub = this.clientService.error
            .subscribe(error => {
                this.loginErrorMessage = error
            });
    }

    toCreateAccountPage(): void {
        this.router.navigate(['/create']);
    }

    onLogin(): void {
        const usernameOrEmail = this.loginForm.value.username;
        const password = this.loginForm.value.password;

        const userLogin: UserLogin = {
            usernameOrEmail: usernameOrEmail,
            password: password
        }
        this.clientService.loginUser(userLogin)
                          .subscribe(response => {
                              console.log(` Login status: ${response.status}`);
                              this.setUserCache(response.body);
                              this.toMainPage(response.status);
                              console.log('+++++++++++++++++++' + userCache.username)

                          });

    }

    ngOnDestroy(): void {
        this.errorSub.unsubscribe();
    }

    toMainPage(status: number): void{
      if (status === 200){
        this.router.navigate(['/mainPage']);
      }
    }

    setUserCache(user: User){
        userCache.id = user.id;
        userCache.username = user.username;
        userCache.email = user.email;
    }

}
