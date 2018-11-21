import { Component, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { DataService } from '../../services/data.service';
import { HeaderService } from '../../services/header.service';
import * as _ from 'lodash';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BibliotecaComponent implements AfterViewInit, OnDestroy {

  @ViewChild('search') search: any;
  books: any [];
  booksShelf: any [];
  themes: any [];
  themeActual: any;
  collapsibleParent: any;
  collapsibleChild: any;
  reader: any;
  searchString: string;
  /*pdf*/
  pointer: number;
  page: number;
  pdfPages: number;
  isLoaded = false;
  result = false;
  subscription: Subscription;
  isOpen = false;
  childIsOpen = false;
  dt: ChangeDetectorRef;
  constructor(private dataService: DataService,
              private translate: TranslateService,
              private headerService: HeaderService,
              detect: ChangeDetectorRef
  ) {
    this.subscription = new Subscription();
    this.dt = detect;
    this.headerService.Hide();
    this.headerService.ChildActive(true);
   const s1 =  this.dataService.getBooks(this.translate.currentLang)
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
    this.subscription.add(s1);
  }

  setItem(theme) {
    if (theme.indexOf('articulos') !== -1 || theme === 'norma' ) {
      this.collapsibleParent.forEach((v) => v.close());
    }

    if (theme.indexOf('articulos') !== -1) {
        this.collapsibleParent[0].open();
    }

    if (theme === 'norma') {
        this.themeActual = 'normasBasicos';
      this.collapsibleParent[1].open(0);
    }   else {

      this.themeActual = theme;

    }
    this.booksShelf = this.books.filter((f: any) => f.tematica.indexOf(this.themeActual ) !== -1);
    this.reader = this.booksShelf[0];
    this.isLoaded = false;
    this.result = false;
    this.pointer = 1;
    //noinspection TypeScriptUnresolvedVariable
    this.search.nativeElement.value = '';
    this.isOpen = true;
    this.dt.markForCheck();

  }
  ReadBook(book) {
    this.reader = book;
    this.pointer = 1;
    this.result = false;
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
      this.booksShelf = this.books.filter((f: any) => f.title.toLowerCase().search(this.searchString) !== -1);
      this.reader = this.booksShelf[0];
      this.result = true;
    }
  }

  doSearch (event) {
    if (event.keyCode === 13) {
      if (this.searchString.length > 2) {
          this.startSearch();
      }     else {
        M.toast({html: '<i>Usted debe introducir al menos tres caracteres. </i>'})
      }
    }
  }

  btnSearch() {
    if (this.searchString.length > 2) {
      this.startSearch();
    }    else {
      M.toast({html: '<i>Al menos tres caracteres</i>'});
    }
  }

  FireAction($event) {
    this.searchString = $event.target.value;
  }

  private populate() {
    this.themeActual = this.themes[0];
    this.booksShelf = this.books.filter((f: any) => f.tematica.indexOf(this.themeActual) !== -1);
    this.reader = this.booksShelf[0];
  }

  private QuitOverFlow() {
    $('.ng2-pdf-viewer-container').css('overflow', 'inherit');
  }

  private initCollapse() {
    const elems = document.querySelectorAll('.collapsible');
    const component = this;
    this.collapsibleParent  = M.Collapsible.init(elems, {
      onOpenEnd: function () {
        component.isOpen = true;
        component.childIsOpen = true;
        //noinspection TypeScriptUnresolvedVariable
        component.dt.markForCheck();
      },
      onCloseEnd: function () {
        const isChild = this.el.className.indexOf('child') > -1;
        component.isOpen = false;
        component.childIsOpen = isChild ? false: true;
        component.isOpen = isChild ? true: false;
        //noinspection TypeScriptUnresolvedVariable
        component.dt.markForCheck();
      }
    });
  }

  ngAfterViewInit() { this.initCollapse(); }
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
}

