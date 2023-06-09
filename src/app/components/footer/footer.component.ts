import {Component} from "@angular/core";
import {Icons, SvgIconsService} from "../../services/icons/svgIcons.service";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.html',
  styleUrls: ['footer.css'],
  imports: [MatIconModule, HttpClientModule],
  standalone: true
})
export class FooterComponent{

  constructor(private iconService: SvgIconsService) {
    this.iconService.loadIcons();
  }

  redirect(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;

    if (clickedElement.tagName === 'svg' || clickedElement.tagName === 'path') {
      const matIconElement = clickedElement.closest('.mat-icon');
      const classNameArray = matIconElement.className.split(' ');

      classNameArray.filter(x => this.filterIconClassName(x))
    }
  }

  private filterIconClassName(className: string): void {
    switch (className){
      case Icons.SPRINGBOOT:
        this.redirectToPage('https://start.spring.io/');
        break;
      case Icons.SPRING:
        this.redirectToPage('https://spring.io/');
        break;
      case Icons.ANGULAR:
        this.redirectToPage('https://angular.io/');
        break;
      case Icons.MYSQL:
        this.redirectToPage('https://www.mysql.com/');
        break;
      case Icons.CSS:
        this.redirectToPage('https://developer.mozilla.org/en-US/docs/Web/CSS');
        break;
      case Icons.HTML:
        this.redirectToPage('https://developer.mozilla.org/en-US/docs/Web/HTML');
        break;
      case Icons.LINKEDIN:
        this.redirectToPage('https://www.linkedin.com/in/mihai-iordache-27a98615a/');
        break;
      case Icons.GITHUB:
        this.redirectToPage('https://github.com/SuperGini')
        break;
      default:
        console.log('Wrong icon selected');
    }
  }

  private redirectToPage(webPage: string): void{
    window.open(webPage, '_blank');
  }
}
