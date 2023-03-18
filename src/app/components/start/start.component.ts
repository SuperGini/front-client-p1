import {Component} from "@angular/core";
import {SvgIconsService} from "../../services/icons/svgIcons.service";
import {FooterComponent} from "../footer/footer.component";
import {Navigating} from "../interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './start.html',
  styleUrls: ['./start.css'],
  imports: [FooterComponent],
  standalone: true
})
export class StartComponent implements Navigating {

  constructor(private iconsService: SvgIconsService, private router: Router) {
    this.iconsService.loadIcons();
  }

  toLoginPage() {
    this.router.navigate(['/login']);
  }

  toCreateAccountPage() {
    this.router.navigate(['/create']);

  }

}
