import {Injectable} from "@angular/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * https://medium.com/ngconf/how-to-using-mat-icon-part-two-2dfb748c7bfc
 * I use this class to add SVG icons to registry so I can display them on the start page
 * and manipulate them using css
 */
@Injectable({providedIn: 'root'})
export class IconsService {

  private iconsName: string [] = [
    Icons.SPRINGBOOT,
    Icons.SPRING,
    Icons.ANGULAR,
    Icons.MYSQL,
    Icons.CSS,
    Icons.HTML,
    Icons.LINKEDIN,
    Icons.GITHUB
  ];

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {

  }

  loadIcons(): void {
    this.iconsName.forEach(icon => this.registerIcon(icon));
  }

  registerIcon(icons: string): void {
    this.matIconRegistry
      .addSvgIcon(`${icons}`, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icons}.svg`))
  }
}

export enum Icons {
  SPRINGBOOT = 'springboot',
  SPRING = 'spring',
  ANGULAR = 'angular',
  HTML = 'html5',
  CSS = 'css3',
  MYSQL = 'mysql',
  LINKEDIN = 'linkedin',
  GITHUB = 'github'
}
