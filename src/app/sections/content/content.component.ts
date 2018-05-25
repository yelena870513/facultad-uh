import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {ContentInterface} from '../../interfaces/content.interface';
import {CategoryInterface} from '../../interfaces/category.interface';
import {TranslateService} from '@ngx-translate/core';
import {fadeIn, fadeOut, pulse} from 'ngx-animate/lib';
import {transition, trigger, useAnimation} from '@angular/animations';
import {log} from 'util';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {HeaderService} from '../../services/header.service';
import {BehaviourService} from '../../services/behaviour.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  animations: [
    trigger('fadeIn', [transition('hideLecture => showLecture', useAnimation(fadeIn))]),
    trigger('fadeOut', [transition('showLecture => hideLecture', useAnimation(fadeOut))]),
    trigger('seekMode', [transition('selectMode => seekMode', useAnimation(fadeIn))]),
    trigger('selectMode', [transition('seekMode => selectMode', useAnimation(fadeIn))]),
    trigger('results', [transition('readMode => resultMode', useAnimation(pulse))]),
  ],
})

export class ContentComponent implements OnInit {
  content: ContentInterface[];
  categories: CategoryInterface[];
  readMode = false;
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
  constructor(
    private dataService: DataService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private behaviour: BehaviourService) {}
  ngOnInit(): void {
    this.headerService.Hide();
    this.showLecture = 'hideLecture';
    this.seekMode = 'selectMode';
    this.resultMode = 'readMode';
    this.searchMode = false;
    this.searchString = '';
    this.page = 1;
    this.route.params.subscribe(params => {
      this.dataService.getContent(this.translate.currentLang)
        .subscribe((data) => {
          if (!_.isUndefined(params.title)) {
            this.content = data.docs.filter(f => (f.tipo === 'content' && !f._deleted ) && f.category.trim() === params.title.trim())
              .sort((a: any, b: any) => a.order - b.order);
          } else {
            this.content = data.docs.filter(f => (f.tipo === 'content' && !f._deleted ) )
              .sort((a: any, b: any) => a.order - b.order);
            if (!_.isUndefined(params.searchString)) {
               this.startSearch(params.searchString);
            }
          }
        });
    });
  }
  openRead(item, readMode, searchString) {
    this.readMode = readMode;
    this.showLecture = readMode ? 'showLecture' : 'hideLecture';
    this.seekMode = readMode ? 'selectMode' : 'seekMode';
    this.readItem = item;
    this.searchString = searchString;
    this.behaviour.CastReadMode(readMode);
    this.behaviour.CastSearchMode(searchString);
  }
  private startSearch(event) {
    this.searchMode = true;
    this.searchString = event;
    this.behaviour.CastSearchMode(this.searchString);
  }
  openReadSearch(item, readMode, searchString) {
    this.openRead(item, readMode, searchString);
    this.searchMode = false;
    this.behaviour.CastReadMode(readMode);
    this.behaviour.CastSearchMode(searchString);
  }
}

