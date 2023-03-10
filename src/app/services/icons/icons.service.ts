import {Injectable} from "@angular/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({providedIn: 'root'})
export class IconsService {

  private iconsName: string [] = [
    Icons.SPRINGBOOT,
    Icons.SPRING,
    Icons.ANGULAR,
    Icons.MYSQL,
    Icons.CSS,
    Icons.HTML
  ];

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {

  }

  loadIcons(): void{
    this.iconsName.forEach(x => this.registerIcon(x));
  }

  registerIcon(icons: string): void{
    this.matIconRegistry
      .addSvgIcon(`${icons}`, this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icons}.svg`))
  }
}

enum Icons {
  SPRINGBOOT = 'springboot',
  SPRING = 'spring',
  ANGULAR = 'angular',
  HTML = 'html5',
  CSS = 'css3',
  MYSQL = 'mysql',
}
