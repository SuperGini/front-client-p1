import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Navigating} from "../interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create2',
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.css'],
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class CreateUserComponent implements OnInit, Navigating{

  signupForm: FormGroup;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    console.log('sssssss')
  }

  toLoginPage(): void {
    this.router.navigate(['/login']);
  }

}
