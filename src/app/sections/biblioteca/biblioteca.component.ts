import { Component } from '@angular/core';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {HeaderService} from '../../services/header.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html'
})

export class BibliotecaComponent {
  books: any [];
  booksShelf: any [];
  themes: any [];
  themeActual: any;
  reader: any;
  /*pdf*/
  pointer: number;
  page: number;
  pdfPages: number;
  isLoaded: boolean = false;
  constructor(private dataService: DataService, private translate: TranslateService, private headerService: HeaderService) {
    this.headerService.Hide();
    this.dataService.getBooks(this.translate.currentLang)
      .subscribe((data: any) => {
       this.books = data.docs.filter((f: any) => f.tematica === 'articulos' || f.tematica.indexOf('norma') !== -1 );
       //noinspection TypeScriptUnresolvedFunction
        this.themes = _.uniq(data.docs.filter((f: any) => f.tematica === 'articulos' || f.tematica.indexOf('norma') !== -1 )
         .map((m: any) => m.tematica));
      });
    /*PDF Viewer*/
    this.pointer = 1;
    this.page = 1;
    this.pdfPages = 1;
    this.booksShelf = [];
  }

  setItem(theme) {
    this.themeActual = theme;
    this.booksShelf = this.books.filter((f: any) => f.tematica.indexOf(theme)!==-1);
  }
  ReadBook(book){
    this.reader = book;
  }
  afterLoadComplete(pdfData: any) {
    this.pdfPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.pointer++;
  }

  prevPage() {
    this.pointer--;
  }
}

