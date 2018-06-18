import { Component } from '@angular/core';
import {HeaderService} from "../../services/header.service";
import {DataService} from "../../services/data.service";
import {CategoryInterface} from "../../interfaces/category.interface";
import {TranslateService} from '@ngx-translate/core';
import {FooterService} from "../../services/footer.service";
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  categories: CategoryInterface [];
  menu: any [];
  constructor(private dataService: DataService, private translate: TranslateService, private headerService: HeaderService,  private footerService: FooterService) {
    this.headerService.Hide();
    this.headerService.ChildActive(true);
    this.footerService.Show();
    this.dataService.getContent(this.translate.currentLang)
      .subscribe((data) => {
        this.categories = data.docs.filter(f => (f.tipo === 'category' && !f._deleted) && f.title !== 'Preguntas y respuestas')
          .sort((a: any, b: any) => a.order - b.order);
      });
    this.menu = [

      {name: 'HOME.ISMAELILLO',ico:"fa fa-child", url: '/ismaelillo' },
      {name: 'HOME.CONTENT', ico:"fa fa-file-text",url: '/contenidos' },
      {name: 'HOME.DERECHO',ico:"fa fa-history", url: '/derecho' },
      {name: 'HOME.BIBLIOTECA',ico:"fa fa-book", url: '/biblioteca' }

    ];
  }
}
