import { Component } from '@angular/core';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {CategoryInterface} from '../../interfaces/category.interface';
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html'
})

export class BibliotecaComponent {
  categories: CategoryInterface [];
  constructor(private dataService: DataService, private translate: TranslateService, private headerService: HeaderService) {
    this.headerService.Show();
    this.dataService.getContent(this.translate.currentLang)
      .subscribe((data) => {
        this.categories = data.docs.filter(f => (f.tipo === 'category' && !f._deleted) && f.title !== 'Preguntas y respuestas')
          .sort((a: any, b: any) => a.order - b.order);
      });
  }
}

