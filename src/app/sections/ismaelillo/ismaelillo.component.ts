import { Component, AfterViewInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {HeaderService} from '../../services/header.service';
import {ContentInterface} from '../../interfaces/content.interface';
//noinspection TypeScriptCheckImport
import { fadeOut, fadeIn } from 'ngx-animate';
import {pulse} from 'ngx-animate/lib';
import {transition, trigger, useAnimation} from '@angular/animations';
import {BehaviourService} from '../../services/behaviour.service';
import * as _ from 'lodash';
import {BookInterface} from '../../interfaces/book.interface';
import {FooterService} from "../../services/footer.service";
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-ismaelillo',
  templateUrl: './ismaelillo.component.html',
  styleUrls: ['./ismaelillo.component.css'],
  animations: [
    trigger('fadeIn', [transition('hideLecture => showLecture', useAnimation(fadeIn))]),
    trigger('fadeOut', [transition('showLecture => hideLecture', useAnimation(fadeOut))]),
    trigger('seekMode', [transition('selectMode => seekMode', useAnimation(fadeIn))]),
    trigger('selectMode', [transition('seekMode => selectMode', useAnimation(fadeIn))]),
    trigger('results', [transition('readMode => resultMode', useAnimation(pulse))]),
  ],
})

export class IsmaelilloComponent implements AfterViewInit{
  content : ContentInterface [] = [];
  books: any [];
  readMode = false;
  teamMode = false;
  readItem = {
    title: '',
    content: '',
  };
  page: number;
  pointer: number;
  pdfPages: number;
  isLoaded: boolean = false;
  fadeIn: any;
  fadeOut: any;
  showLecture: any;
  seekMode: any;
  resultMode: any;
  searchMode: boolean;
  searchString: string;
  estado: string;
  currentBook: any;
  /*panelMode, readMode, searchMode, teamMode, actionMode*/
  currentMode: string;
  cientifico: any[];
  constructor(private dataService: DataService,
              private translate: TranslateService,
              private headerService: HeaderService,
              private footerService: FooterService,
              private behaviour: BehaviourService) {
    this.headerService.Show();
    this.headerService.ChildActive(true);
    this.footerService.Show();
    this.dataService.getBooks(this.translate.currentLang).subscribe((data: any) => {
      this.books = data.docs.filter((f: any) => f.tematica === 'ismaelillo').map((m: any) => {m.tipo = 'pdf'; return m;});
      this.books.push(
        {
          order: 2,
          content: '',
          title: 'Colectivo Investigador',
          img: 'comite.jpg',
          tipo: 'research'
        }
      );
      this.books = this.books.sort((a: any, b: any) => a.order - b.order);
      this.currentBook = this.books[0];
    });
    this.dataService.getCientifico(this.translate.currentLang).subscribe((data:any) => {
      this.cientifico = data.docs;
    });
    this.headerService.Hide();
    this.showLecture = 'hideLecture';
    this.seekMode = 'selectMode';
    this.resultMode = 'readMode';
    this.searchMode = false;
    this.searchString = '';
    this.currentMode = 'panelMode';
    this.estado = 'libros';
    this.page = 1;
    /*PDF Viewer*/
    this.pointer = 1;
    this.pdfPages = 1;
  }
  openRead(item, readMode, searchString) {
    this.readMode = readMode;
    this.showLecture = readMode ? 'showLecture' : 'hideLecture';
    this.seekMode = readMode ? 'selectMode' : 'seekMode';
    this.currentMode = readMode ? 'panelMode' : 'readMode';
    this.readItem = item;
    this.searchString = searchString;
    this.pointer=1;
    //noinspection TypeScriptUnresolvedFunction
    if (_.isUndefined(item)) {
      this.teamMode = false;
      this.behaviour.CastTeamMode(false);
    }    else {
      switch (item.tipo) {
        case 'research':
          this.teamMode = true;
          this.currentMode = 'teamMode';
          this.showLecture = 'hideLecture';
          this.seekMode = 'selectMode';
          this.resultMode = 'readMode';
          this.searchMode = false;
          this.estado ='testimonial';
          this.currentBook = item;
          setTimeout(() => {
            this.behaviour.CastTeamMode(true);
          }, 300);
          break;
        case 'pdf':
          this.currentMode = 'actionMode';
          this.showLecture = 'hideLecture';
          this.seekMode = 'selectMode';
          this.resultMode = 'readMode';
          this.currentBook = item;
          this.estado ='libros';
          break;
        default:
          this.teamMode = false;
          this.behaviour.CastTeamMode(false);
          break;
      }
    }
  }
  Estado(estado: string){
    this.estado= estado;
    this.page=1;
    this.pointer=1;
    this.readMode = !this.readMode;
    this.currentBook = this.books[0];
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }
  ReadBook(book) {
    this.currentBook = book;
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

  ngAfterViewInit() {
    $('#nav').addClass('fixed-nav').removeClass('hidden')
  }

  private QuitOverFlow() {
    $('.ng2-pdf-viewer-container').css('overflow','inherit');
  }
}

