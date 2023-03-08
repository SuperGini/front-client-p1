import {Component} from "@angular/core";
import {TableComponent} from "../table/table.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './start.html',
  styleUrls: ['./start.css'],
  imports: [TableComponent, RouterOutlet],
  standalone: true
})
export class StartComponent {

}
