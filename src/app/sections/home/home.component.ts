import { Component } from '@angular/core';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {CategoryInterface} from '../../interfaces/category.interface';
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  categories: CategoryInterface [];
  menu: any [];
  constructor(private dataService: DataService, private translate: TranslateService, private headerService: HeaderService) {
    this.headerService.Show();
    this.dataService.getContent(this.translate.currentLang)
      .subscribe((data) => {
        this.categories = data.docs.filter(f => (f.tipo === 'category' && !f._deleted) && f.title !== 'Preguntas y respuestas')
          .sort((a: any, b: any) => a.order - b.order);
      });
    this.menu = [

      {name: 'NAV.ISMAELILLO',frase:'Espantado de todo me refugio en ti. Tengo fe en el mejoramiento humano, en la vida futura, en la utilidad de la virtud…', url: '/ismaelillo' },
      {name: 'NAV.CONTENT', frase:'Espantado de todo me refugio en ti. Tengo fe en el mejoramiento humano, en la vida futura, en la utilidad de la virtud…',url: '/content' },
      {name: 'NAV.DERECHO',frase:'Espantado de todo me refugio en ti. Tengo fe en el mejoramiento humano, en la vida futura, en la utilidad de la virtud…', url: '/derecho' },
      {name: 'NAV.CATEDRA', frase:'Espantado de todo me refugio en ti. Tengo fe en el mejoramiento humano, en la vida futura, en la utilidad de la virtud…',url: '/catedra' }
    ];
  }
}

