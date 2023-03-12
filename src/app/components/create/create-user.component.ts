import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.css'],
  imports: [
    ReactiveFormsModule,
    FooterComponent
  ],
  standalone: true
})
export class CreateUserComponent implements OnInit{

  public signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    console.log(this.signupForm.value.username + 'xxxx')
    this.signupForm.value.username;

  }

}
