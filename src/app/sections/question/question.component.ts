import { Component, OnInit, AfterViewInit, TemplateRef, ElementRef , ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import * as _ from 'lodash';

import { DataService } from '../../services/data.service';
import { HeaderService } from '../../services/header.service';

declare var M: any;
declare var $: any;
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, AfterViewInit, OnDestroy {
  questions = [];
  books = [];
  i: any;
  player: any;
  reader: any;
  droppedItems = [];
  gallery = [];
  readMode = false;
  page = 1;
  page1 = 1;
  pointer = 1;
  pdfPages = 1;
  isLoaded = false;
  estado: string;
  base = './assets/video/';
  poster = './assets/images/';
  isOpen =  false;
  @ViewChild('media') media: ElementRef;
  subscription: Subscription;
  constructor(private headerService: HeaderService,
              private dataService: DataService,
              private translate: TranslateService,
              private dt: ChangeDetectorRef
              ) {
    this.subscription = new Subscription();
    this.headerService.Hide();
    this.headerService.ChildActive(false);
    const s1 = this.dataService.getQuestion(this.translate.currentLang).subscribe((data: any) => {
      this.questions = data.docs.sort((s: any, s2: any) => s.order - s2.order);
      this.i = this.questions[0];
    }, ( error1 => {
       console.log(error1);
    } ));

    const s2 = this.dataService.getBooks(this.translate.currentLang).subscribe((data: any) => {
      this.books = data.docs.filter(f => f.tematica === 'estudiantes');
      this.reader = this.books[0];
    });

    const s3 = this.dataService.getGallery(this.translate.currentLang).subscribe((data: any) => {
      this.gallery = data.docs.filter((f: any) => f.type === 'video' && f.theme === 'SECTION.COMPLEMENTARIO')
        .sort((a: any, b: any) => a.order - b.order)
        .map((i: any) => {
          i.src = this.base + i.src;
          i.poster = this.poster + i.poster;
          return i;
        })
      ;
      this.player = this.gallery[0];
    });
    /*PDF Viewer*/
    this.pointer = 1;
    this.pdfPages = 1;
    this.estado = 'cuestionario';
    this.subscription.add(s1);
    this.subscription.add(s2);
    this.subscription.add(s3);
  }


  checkAnswer(item, event) {
    item.checked = event.target.checked;
    if (event.target.checked) {

        if (item.value === true) {
            item.resource = 'T';

        } else {
          item.resource = 'F';
        }
    } else {
      item.resource = 'N';
    }
  }

  radioAnswer(item, event) {
    item.checked = event.target.checked;
    if (event.target.checked) {

        if (item.value === true) {
            item.resource = 'T';

        } else {
          item.resource = 'F';
        }
    } else {
      item.resource = 'N';
    }
  }

  removeItem(e: any) {
    this.droppedItems = this.droppedItems.filter((f: any) => f.name !== e.target.innerText);
  }

  Estado(estado: string) {
    this.estado = estado;
    this.page = 1;
    this.readMode = !this.readMode;
    this.player = this.gallery[0];
    //noinspection TypeScriptUnresolvedFunction
    if (!_.isNil(this.media)) {
      this.media.nativeElement.load();
    }

    this.reader = this.books[0];
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }

  onItemDrop(e: any, answer) {
    // Get the dropped data here
    //noinspection TypeScriptUnresolvedFunction
    if (_.isUndefined(answer.dropped)) {
      answer.dropped = [];
    }

    if (answer.dropped.length < answer.values.length && !_.find(answer.dropped, (value) => value === e.dragData)) {
    answer.dropped.push(e.dragData);
    }
  }

  Selecter(item) {
    this.i = item;
    this.i.items = item.items.map((m: any) => { m.resource = 'A'; return m; });
    this.readMode = false;
    this.i.falseValues = [];
    this.i.trueValues = [];
    $('.card-reveal').css('display', 'none');
  }

  setPlayer(player: any) {
    this.player = player;
    this.media.nativeElement.load();

  }

  ReadBook(book) {
    this.reader = book;
    this.pointer = 1;
    this.readMode = true;
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

  ngOnInit() {
    $('#nav').addClass('fixed-nav').removeClass('hidden');

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    const component = this;
    const elems = document.querySelectorAll('.collapsible');
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

  trueAllowed(items: any[]) {
    return items.filter((f: any) => f.value === true).map((m: any) => m.name);

  }

  falseAllowed(items: any[]){
    return items.filter((f: any) => f.value === false).map((m: any) => m.name);
  }

  onTrueDrop(e: any, answer) {
    // Get the dropped data here
    //noinspection TypeScriptUnresolvedFunction
    if (_.isUndefined(answer.trueValues)) {
      answer.trueValues = [];
    }

    if ( !_.find(answer.trueValues, (value) => value === e.dragData)) {
      answer.trueValues.push(e.dragData);
    }
  }

  onFalseDrop(e: any, answer) {
    // Get the dropped data here
    //noinspection TypeScriptUnresolvedFunction
    if (_.isUndefined(answer.falseValues)) {
      answer.falseValues = [];
    }

    if (!_.find(answer.falseValues, (value) => value === e.dragData)) {
      answer.falseValues.push(e.dragData);
    }
  }

  private QuitOverFlow() {
    $('.ng2-pdf-viewer-container').css('overflow', 'inherit');
  }
}
