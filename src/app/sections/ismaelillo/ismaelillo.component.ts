import { Component } from '@angular/core';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {HeaderService} from '../../services/header.service';
import {ContentInterface} from '../../interfaces/content.interface';
import { fadeOut, fadeIn } from 'ngx-animate';
import {pulse} from 'ngx-animate/lib';
import {transition, trigger, useAnimation} from '@angular/animations';
import {BehaviourService} from '../../services/behaviour.service';
import * as _ from 'lodash';
import {BookInterface} from '../../interfaces/book.interface';
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

export class IsmaelilloComponent {
  content: ContentInterface [];
  books: BookInterface [];
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
  currentBook: BookInterface;
  /*panelMode, readMode, searchMode, teamMode, actionMode*/
  currentMode: string;
  constructor(private dataService: DataService,
              private translate: TranslateService,
              private headerService: HeaderService,
              private behaviour: BehaviourService) {
    this.headerService.Show();
    this.dataService.getContent(this.translate.currentLang)
      .subscribe((data) => {
        this.content = data.docs.filter(f => (f.tipo === 'content' && !f._deleted) && f.category === 'Proyecto Ismaelillo');
        this.content.push({
          _id: '_dev',
          _rev: '_dev',
          _deleted: 'false',
          category: 'research',
          tags: [],
          order: 2,
          content: '',
          title: 'Colectivo Investigador',
          tipo: 'research'
        },
          {
            _id: '_dev1',
            _rev: '_dev2',
            _deleted: 'false',
            category: 'action',
            tags: [],
            order: 4,
            content: '',
            title: 'Acciones y resultados',
            tipo: 'pdf'
          });
        this.content = this.content.sort((a: any, b: any) => a.order - b.order);
      });
    this.dataService.getBooks(this.translate.currentLang).subscribe((data) => {
      this.books = data.docs.slice(0, 5);
      this.currentBook = this.books[0];
    });
    this.headerService.Hide();
    this.showLecture = 'hideLecture';
    this.seekMode = 'selectMode';
    this.resultMode = 'readMode';
    this.searchMode = false;
    this.searchString = '';
    this.currentMode = 'panelMode';
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
          setTimeout(() => {
            this.behaviour.CastTeamMode(true);
          }, 300);
          break;
        case 'pdf':
          this.currentMode = 'actionMode';
          this.showLecture = 'hideLecture';
          this.seekMode = 'selectMode';
          this.resultMode = 'readMode';
          break;
        default:
          this.teamMode = false;
          this.behaviour.CastTeamMode(false);
          break;
      }
    }
  }

  ReadBook(book) {
    this.currentBook = book;
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

