import { Component, ViewChild, TemplateRef } from '@angular/core';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {HeaderService} from '../../services/header.service';
import * as _ from 'lodash';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css']
})

export class BibliotecaComponent {
  @ViewChild("search") search: any;
  books: any [];
  booksShelf: any [];
  themes: any [];
  themeActual: any;
  reader: any;
  searchString: string;
  /*pdf*/
  pointer: number;
  page: number;
  pdfPages: number;
  isLoaded: boolean = false;
  result: boolean = false;
  constructor(private dataService: DataService, private translate: TranslateService, private headerService: HeaderService) {
    this.headerService.Hide();
    this.dataService.getBooks(this.translate.currentLang)
      .subscribe((data: any) => {
       this.books = data.docs.filter((f: any) => f.tematica === 'articulos' || f.tematica.indexOf('norma') !== -1 );
       //noinspection TypeScriptUnresolvedFunction
        this.themes = _.uniq(data.docs.filter((f: any) => f.tematica === 'articulos' || f.tematica.indexOf('norma') !== -1 )
         .map((m: any) => m.tematica));
        this.populate();

      });
    /*PDF Viewer*/
    this.pointer = 1;
    this.page = 1;
    this.pdfPages = 1;
    this.booksShelf = [];
    this.searchString = '';

  }

  setItem(theme) {
    this.themeActual = theme;
    this.booksShelf = this.books.filter((f: any) => f.tematica.indexOf(theme)!==-1);
    this.reader = this.booksShelf[0];
    this.isLoaded = false;
    this.result = false;
    this.pointer = 1;
    //noinspection TypeScriptUnresolvedVariable
    this.search.nativeElement.value = "";
  }
  ReadBook(book){
    this.reader = book;
    this.pointer = 1;
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

  startSearch() {
    if (this.searchString.length > 2) {
      this.booksShelf = this.books.filter((f: any) => f.title.toLowerCase().search(this.searchString) !== -1);
      this.reader = this.booksShelf[0];
      this.result = true;
    }
  }

  doSearch (event)
  {
    if (event.keyCode === 13) {
      if (this.searchString.length>2) {
          this.startSearch()
      }
      else{
        M.toast({html: '<i>Al menos tres caracteres</i>'})
      }
    }
  }

  btnSearch() {
    if (this.searchString.length>2) {
      this.startSearch()
    }
    else{
      M.toast({html: '<i>Al menos tres caracteres</i>'})
    }
  }

  FireAction($event) {
    this.searchString = $event.target.value;
  }

  private populate() {
    this.themeActual = this.themes[0];
    this.booksShelf = this.books.filter((f: any) => f.tematica.indexOf(this.themeActual)!==-1);
    this.reader = this.booksShelf[0];
  }

  private QuitOverFlow() {
    $('.ng2-pdf-viewer-container').css('overflow','inherit');
  }
}

