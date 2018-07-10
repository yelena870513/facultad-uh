import { Component, AfterViewInit, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {CategoryInterface} from '../../interfaces/category.interface';
import {HeaderService} from '../../services/header.service';
import {FooterService} from "../../services/footer.service";
import {Router} from '@angular/router';
import * as _ from 'lodash';
declare var $: any;
declare var window: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  implements AfterViewInit, OnInit{
  categories: CategoryInterface [];
  menu: any [];
  constructor(private dataService: DataService, private translate: TranslateService, private headerService: HeaderService, private footerService: FooterService,  private router: Router) {
    this.headerService.Show();
    this.headerService.ChildActive(false);
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

  ngOnInit(){
 try{
   //noinspection TypeScriptUnresolvedFunction
   if (window.sessionStorage.getItem('landing')==null) {
     this.router.navigate(['/landing']);
   }
 }
 catch (err){
   alert(err.message);
 }
  }
}

