import {Component} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {Icons, IconsService} from "../../services/icons/icons.service";
import {FooterComponent} from "../footer/footer.component";
import {Navigating} from "../interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './start.html',
  styleUrls: ['./start.css'],
  imports: [MatIconModule, HttpClientModule, FooterComponent],
  standalone: true
})
export class StartComponent implements Navigating{

  constructor(private iconsService: IconsService, private router: Router) {
    this.iconsService.loadIcons();
  }

  toLoginPage() {
    this.router.navigate(['/login']);
  }

  toCreateAccountPage() {
    this.router.navigate(['/create']);

  }

}
