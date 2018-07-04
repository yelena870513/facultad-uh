import { Component, AfterViewInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {HeaderService} from '../../services/header.service';
import {ContentInterface} from '../../interfaces/content.interface';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-contenidos',
  templateUrl: './contenidos.component.html',
  styleUrls:['./contenidos.component.css']
})

export class ContenidosComponent implements AfterViewInit {
  categories: ContentInterface [];
  current: ContentInterface;
  constructor(private dataService: DataService, private translate: TranslateService, private headerService: HeaderService) {
    this.headerService.Hide();
    this.headerService.ChildActive(true);
    this.dataService.getContent(this.translate.currentLang)
      .subscribe((data) => {
        this.categories = data.docs.filter(f => (f.tipo === 'content' && !f._deleted) && f.category === 'Preguntas y respuestas')
          .sort((a: any, b: any) => a.order - b.order);
        this.current = this.categories[0];
      });
  }
  Selecter(item) {
    this.current = item;
  }
  ngAfterViewInit() {
    $('body,html').animate({
      scrollTop: 0
    }, 600);
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems,{});
  };

}

