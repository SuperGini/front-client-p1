import {Component, inject} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.html',
  styleUrls: ['./logout.css'],
  standalone: true
})
export class LogoutComponent {

  private router = inject(Router);

  logoutUser() {
    this.router.navigate(['../../login']);
    sessionStorage.removeItem('username');


  }
}
