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
    localStorage.removeItem('username');
    this.router.navigate(['../../login']);
  }
}
