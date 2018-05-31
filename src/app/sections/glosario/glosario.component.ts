import { Component } from '@angular/core';
import {DataService} from "../../services/data.service";
import {TranslateService} from '@ngx-translate/core';
import {HeaderService} from "../../services/header.service";


@Component({
  selector: 'app-glosario',
  templateUrl: './glosario.component.html',
  styleUrls: ['./glosario.component.scss']
})

export class GlosarioComponent {
  glossary: any [];
  term: any;
 constructor(private dataService: DataService, private translate: TranslateService, private headerService: HeaderService) {
   this.headerService.Hide();
   this.dataService.getGlossary(this.translate.currentLang).subscribe((data: any) => {
     this.glossary = data.docs;
     this.term = this.glossary[0];
   });
 }
  setItem(item) {
    this.term = item;
  }
}


