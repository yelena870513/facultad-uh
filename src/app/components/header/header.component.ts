import {Component} from '@angular/core';
import {MenuInterface} from '../../interfaces/menu.interface';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  menu: MenuInterface[];
  constructor(translate: TranslateService) {
       this.menu = [
      {name: 'NAV.HOME', url: '/home', ico: 'fa fa-menu' },
      {name: 'NAV.CONTENT', url: '/content', ico: 'fa fa-menu' }
      ];
  }

}
