import {Component} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {IconsService} from "../../services/icons/icons.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.html',
  styleUrls: ['./start.css'],
  imports: [MatIconModule, HttpClientModule],
  standalone: true
})
export class StartComponent {

  constructor(private iconsService: IconsService) {
    this.iconsService.loadIcons();
  }

}
