import { Component } from '@angular/core';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
import {HeaderService} from '../../services/header.service';
import {ContentInterface} from '../../interfaces/content.interface';
import {fadeIn, fadeOut, pulse} from 'ngx-animate/lib';
import {transition, trigger, useAnimation} from '@angular/animations';
import {BehaviourService} from '../../services/behaviour.service';
import * as _ from 'lodash';
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
  readMode = false;
  teamMode = false;
  readItem = {
    title: '',
    content: '',
  };
  page: number;
  fadeIn: any;
  fadeOut: any;
  showLecture: any;
  seekMode: any;
  resultMode: any;
  searchMode: boolean;
  searchString: string;
  /*readMode, searchMode, teamMode, actionMode*/
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
            category: 'research',
            tags: [],
            order: 4,
            content: '',
            title: 'Acciones y resultados',
            tipo: 'pdf'
          });
        this.content = this.content.sort((a: any, b: any) => a.order - b.order);
      });
    this.headerService.Hide();
    this.showLecture = 'hideLecture';
    this.seekMode = 'selectMode';
    this.resultMode = 'readMode';
    this.searchMode = false;
    this.searchString = '';
    this.currentMode = '';
    this.page = 1;
  }
  openRead(item, readMode, searchString) {
    this.readMode = readMode;
    this.showLecture = readMode ? 'showLecture' : 'hideLecture';
    this.seekMode = readMode ? 'selectMode' : 'seekMode';
    this.readItem = item;
    this.searchString = searchString;
    if (!_.isUndefined(item) && item.tipo === 'research') {
      this.teamMode = true;
      this.showLecture = 'hideLecture';
      this.seekMode = 'selectMode';
      this.resultMode = 'readMode';
      this.searchMode = false;
      setTimeout(() => {
        this.behaviour.CastTeamMode(true);
      }, 300);
    }    else {
      this.teamMode = false;
    }
    if (_.isUndefined(item)) {
      this.behaviour.CastTeamMode(false);
    }
  }
}

