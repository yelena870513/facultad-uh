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
  i: any;
  droppedItems = [];
  page = 1;
  removeItem(e: any) {
    this.droppedItems = this.droppedItems.filter((f: any) => f.name !== e.target.innerText);
  }
  constructor(private headerService: HeaderService, private dataService: DataService, private translate: TranslateService) {
    this.headerService.Hide();
    this.dataService.getQuestion(this.translate.currentLang).subscribe((data: any) => {
      this.questions = data.docs.sort((a:any, b: any) => a.title - b.title);
      this.i = this.questions[0];
    }, ( error1 => {
       console.log(error1);
    } ));
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
  }

  ngOnInit() {
    $('#nav').addClass('fixed-nav').removeClass('hidden');

  }
}
