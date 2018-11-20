import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { DataService } from '../../services/data.service';
import { HeaderService } from '../../services/header.service';
import { ContentInterface } from '../../interfaces/content.interface';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-contenidos',
  templateUrl: './contenidos.component.html',
  styleUrls: ['./contenidos.component.css']
})

export class ContenidosComponent implements AfterViewInit, OnDestroy {
  categories: ContentInterface [];
  current: ContentInterface;
  books: any [];
  glossary: any [];
  term1: any;
  term: any;
  page = 1;
  estado: string;
  pointer: number;
  pdfPages: number;
  isLoaded = false;
  subscription: Subscription;
  isOpen =  false;
  dt: ChangeDetectorRef;
  constructor(
    private dataService: DataService,
    private translate: TranslateService,
    private headerService: HeaderService,
    dt: ChangeDetectorRef) {
    this.subscription = new Subscription();
    this.estado = 'preguntas';
    this.headerService.Hide();
    this.headerService.ChildActive(true);
    const s1 = this.dataService.getContent(this.translate.currentLang)
      .subscribe((data) => {
        this.categories = data.docs.filter(f => (f.tipo === 'content' && !f._deleted) && f.category === 'Preguntas y respuestas')
          .sort((a: any, b: any) => a.order - b.order);
        this.current = this.categories[0];
      });
    const s2 = this.dataService.getBooks(this.translate.currentLang).subscribe((data: any) => {
      this.books = data.docs.filter(f => f.tematica === 'etica');
      this.term = this.books[0];
    });
   const s3 =  this.dataService.getGlossary(this.translate.currentLang).subscribe((data: any) => {
      this.glossary = data.docs;
      this.term1 = this.glossary[0];
    });
    /*PDF Viewer*/
    this.pointer = 1;
    this.pdfPages = 1;
    this.isOpen = false;
    this.dt = dt;
    this.subscription.add(s1);
    this.subscription.add(s2);
    this.subscription.add(s3);
  }

  setTerm(item) {
    this.term1 = item;
    this.pointer = 1;
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }

  Estado(estado: string) {
    this.estado = estado;
    this.current = this.categories[0];
    this.page = 1;
    this.term1 = this.glossary[0];
    this.term = this.books[0];
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }

  ReadBook(item) {
    this.term = item;
    this.pointer = 1;
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }

  afterLoadComplete(pdfData: any) {
    this.pdfPages = pdfData.numPages;
    this.isLoaded = true;
    this.QuitOverFlow();
  }

  nextPage() {
    this.pointer++;
  }

  prevPage() {
    this.pointer--;
  }

  private QuitOverFlow() {
    $('.ng2-pdf-viewer-container').css('overflow', 'inherit');
  }

  Selecter(item) {
    this.current = item;
    $('body,html').animate({
      scrollTop: 0
    }, 600);
    setTimeout(() => {
      const elems = document.querySelectorAll('.men');
      for (let i = 0; i < elems.length; i++) {
        elems[i].addEventListener('click', function (event) {
          M.Toast.dismissAll();
          let message = '';
          //noinspection TypeScriptUnresolvedVariable
          switch (elems[i].innerHTML.toLowerCase()) {
            case 'estado':
              // tslint:disable-next-line:max-line-length
              message = 'Fenómeno social históricamente condicionado. Sistema de órganos de poder público. Organización política de poder soberano.';
              break;
            case 'bioética':
              // tslint:disable-next-line:max-line-length
              message = 'Ciencia moderna que responde a la preocupación del ser humano ante las investigaciones científicas y los adelantos tecnológicos, focalizando su atención en los dilemas éticos alrededor de los procesos investigativos, o sea, los medios que utilizan los científicos para alcanzar su fin último, con énfasis en el respeto a la vida, el desarrollo futuro de la humanidad y la protección del medio ambiente.';
              break;
            case 'responsabilidad ':
              // tslint:disable-next-line:max-line-length
              message = 'Es la exigencia por parte de la ley que se establece cuando ocurre un daño o infracción de una norma jurídica para restaurar el objeto del daño o la infracción a la situación anterior, sancionar al comisor del acto, y prevenir de esa manera futuras conductas semejantes.';
              break;
            default:
              break;
          }
          M.toast({html: message});
        });
      }
    }, 100);
  }

  ngAfterViewInit() {
    const elems = document.querySelectorAll('.collapsible');
    const component = this;
    const instances = M.Collapsible.init(elems, {
      onOpenEnd: function () {
        component.isOpen = true;
        //noinspection TypeScriptUnresolvedVariable
        component.dt.markForCheck();
      },
      onCloseEnd: function () {
        component.isOpen = false;
        //noinspection TypeScriptUnresolvedVariable
        component.dt.markForCheck();
      }
    });
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

