import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import {HeaderService} from '../../services/header.service';
import * as _ from 'lodash';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';
//noinspection TypeScriptCheckImport
import {log} from 'util';
declare var M: any;
declare var $: any;
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions = [];
  books = [];
  i: any;
  reader: any;
  droppedItems = [];
  readMode = false;
  page = 1;
  page1 = 1;
  pointer = 1;
  pdfPages = 1;
  isLoaded = false;
  removeItem(e: any) {
    this.droppedItems = this.droppedItems.filter((f: any) => f.name !== e.target.innerText);
  }
  constructor(private headerService: HeaderService, private dataService: DataService, private translate: TranslateService) {
    this.headerService.Hide();
    this.dataService.getQuestion(this.translate.currentLang).subscribe((data: any) => {
      this.questions = data.docs;
      this.i = this.questions[0];
    }, ( error1 => {
       console.log(error1);
    } ));

    this.dataService.getBooks(this.translate.currentLang).subscribe((data: any) => {
      this.books = data.docs.filter(f => f.tematica === 'estudiantes');
      this.reader = this.books[0];
    });
    /*PDF Viewer*/
    this.pointer = 1;
    this.pdfPages = 1;
  }
  checkAnswer(item,event) {
    if(event.target.checked){
        if(item.value === true){
            item.resource = 'T';
        }
        else{
          item.resource = 'F';
        }
    }
    else{
      item.resource = 'N';
    }
  }
  onItemDrop(e: any, answer) {
    // Get the dropped data here
    //noinspection TypeScriptUnresolvedFunction
    if(_.isUndefined(answer.dropped)){
      answer.dropped = [];
    }

    if(answer.dropped.length < answer.values.length && !_.find(answer.dropped, (value) => value === e.dragData)){
    answer.dropped.push(e.dragData);
    }
  }

  Selecter(item) {
    this.i = item;
    this.readMode = false;
  }

  ReadBook(book){
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

  private QuitOverFlow() {
    $('.ng2-pdf-viewer-container').css('overflow','inherit');
  }
}
