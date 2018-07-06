import { Component, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {HeaderService} from '../../services/header.service';
import * as _ from 'lodash';
declare var $: any;
declare var M: any;

@Component({
  selector: 'app-derecho',
  templateUrl: './derecho.component.html',
  styleUrls: ['./derecho.component.css']
})

export class DerechoComponent implements AfterViewInit {
  @ViewChild("search") search: any;
  books: any [];
  booksShelf: any [];
  booksShelf1: any [];
  themes: any [];
  themeActual: any;
  reader: any;
  term: any;
  searchString: string;
  estado: string;
  /*pdf*/
  pointer: number;
  page: number;
  page1: number;
  pdfPages: number;
  isLoaded: boolean = false;
  result: boolean = false;
  constructor(private dataService: DataService, private translate: TranslateService, private headerService: HeaderService) {
    this.headerService.Hide();
    this.headerService.ChildActive(true);
    this.dataService.getBooks(this.translate.currentLang)
      .subscribe((data: any) => {
        this.books = data.docs.filter((f: any) => f.tematica === 'juristas' || f.tematica === 'leyes' );
        //noinspection TypeScriptUnresolvedFunction

        this.populate();

      });
    /*PDF Viewer*/
    this.pointer = 1;
    this.page = 1;
    this.page1 = 1;
    this.pdfPages = 1;
    this.booksShelf = [];
    this.searchString = '';
    this.estado = 'juristas';

  }
  Estado(estado: string){
    this.estado= estado;
    if (this.estado=='juristas'){
      this.reader = this.booksShelf[0];

    }else {
      this.reader = this.booksShelf1[0];
    }
    this.page=1;
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }
  setTerm(item) {
    this.term = item;
    this.pointer = 1;
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }
  ReadBook(book){
    this.reader = book;
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

  startSearch() {
    if (this.searchString.length > 2) {
      this.booksShelf1 = this.books.filter((f: any) => f.title.toLowerCase().search(this.searchString) !== -1);
      this.reader = this.booksShelf1[0];
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
    this.booksShelf = this.books.filter((f: any) => f.tematica === 'juristas' );
    this.booksShelf1 = this.books.filter((f: any) => f.tematica === 'leyes' );
    //noinspection TypeScriptUnresolvedFunction
    this.reader = this.booksShelf[0];


  }
  ngAfterViewInit() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems,{});

    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }

  private QuitOverFlow() {
    $('.ng2-pdf-viewer-container').css('overflow','inherit');
  }
}
