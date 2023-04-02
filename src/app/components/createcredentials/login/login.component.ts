import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Navigating} from "../../interfaces";

@Component({
  selector: 'app-login2',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class LoginComponent implements OnInit, Navigating{

  loginForm: FormGroup;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  toCreateAccountPage(): void {
    this.router.navigate(['/create']);
  }

  onSubmit(){

  }
}
