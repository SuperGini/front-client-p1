import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FooterComponent} from "../footer/footer.component";
import {Router, RouterOutlet} from "@angular/router";
import {Navigating} from "../interfaces";
import {CreateUserComponent} from "./createuser/create-user.component";
import {LoginComponent} from "./login/login.component";

@Component({
  selector: 'app-create-user',
  templateUrl: './user-credential-container.html',
  styleUrls: ['./user-credential-container.css'],
  imports: [
    ReactiveFormsModule,
    FooterComponent,
    CreateUserComponent,
    LoginComponent,
    RouterOutlet
  ],
  standalone: true
})
export class UserCredentialContainerComponent implements OnInit, Navigating {

  //https://stackoverflow.com/questions/56003504/angular7-nullinjectorerror-no-provider-for-formgroup
  public signupForm: FormGroup; //do not inject this in constructor -> error

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    console.log(this.signupForm.value.username + 'xxxx')
    this.signupForm.value.username;
  }

  toLoginPage(): void {
    this.router.navigate(['/login']);
  }

}
