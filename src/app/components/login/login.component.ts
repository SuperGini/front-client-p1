import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [ReactiveFormsModule, FooterComponent],
  standalone: true
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  onSubmit(){
    console.log(this.loginForm.value.username + 'xxxx');
    this.loginForm.value.username;
  }


}
