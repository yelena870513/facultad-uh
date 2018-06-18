import { Component, AfterViewInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {CategoryInterface} from '../../interfaces/category.interface';
import {HeaderService} from '../../services/header.service';
import {FooterService} from "../../services/footer.service";
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  implements AfterViewInit{
  categories: CategoryInterface [];
  menu: any [];
  constructor(private dataService: DataService, private translate: TranslateService, private headerService: HeaderService, private footerService: FooterService) {
    this.headerService.Show();
    this.footerService.Hide();
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
  ngAfterViewInit() {
    // $('#nav').addClass('fixed-nav').removeClass('hidden')
  }
}

