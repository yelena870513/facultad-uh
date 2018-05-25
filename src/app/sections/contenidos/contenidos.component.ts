import { Component } from '@angular/core';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {HeaderService} from '../../services/header.service';
import {ContentInterface} from '../../interfaces/content.interface';

@Component({
  selector: 'app-contenidos',
  templateUrl: './contenidos.component.html'
})

export class ContenidosComponent {
  categories: ContentInterface [];
  current: ContentInterface;
  constructor(private dataService: DataService, private translate: TranslateService, private headerService: HeaderService) {
    this.headerService.Hide();
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
}

