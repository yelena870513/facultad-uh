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

      {name: 'NAV.ISMAELILLO',ico:"fa fa-child",frase:'Espantado de todo me refugio en ti. Tengo fe en el mejoramiento humano, en la vida futura, en la utilidad de la virtud…', url: '/ismaelillo' },
      {name: 'NAV.CONTENT', ico:"fa fa-file-text",frase:'Espantado de todo me refugio en ti. Tengo fe en el mejoramiento humano, en la vida futura, en la utilidad de la virtud…',url: '/content' },
      {name: 'NAV.DERECHO',ico:"fa fa-history",frase:'Espantado de todo me refugio en ti. Tengo fe en el mejoramiento humano, en la vida futura, en la utilidad de la virtud…', url: '/derecho' },
      {name: 'NAV.CATEDRA', ico:"fa fa-university",frase:'Espantado de todo me refugio en ti. Tengo fe en el mejoramiento humano, en la vida futura, en la utilidad de la virtud…',url: '/catedra' }
    ];
  }
}

