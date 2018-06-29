import { Component, OnInit, Input } from '@angular/core';
import * as uuid from 'uuid';
declare var M: any;
declare var $: any;
@Component({
  selector: 'app-selectable',
  template: `<div id="div{{index}}">
 <!-- Dropdown Trigger -->
            <a class='dropdown-trigger btn' data-target='dropdown{{index}}' id="a{{index}}">{{pair.name}} </a> 
              <span *ngIf="selected" [ngClass]="{ 'error': selected !== pair.value, 'check': selected === pair.value }">{{selected}}</span>
                       
            <!-- Dropdown Structure -->
            <ul id='dropdown{{index}}' class='dropdown-content'>
              <li *ngFor="let p of posible" (click)="setItem(p)"><a >{{p}}</a></li>
            </ul></div>`,
  styles: ['span.error{color:red;}','span.check{color:green;}']
})

export class SelectableComponent implements OnInit{
  @Input()
  posible: any [];
  @Input()
  pair: any;
  selected = '';
  @Input()
  index : any;
  ngOnInit() {
   setTimeout(() => {
     try{
       var elems = document.querySelector('#a'+this.index);
       var div = document.querySelector('#div'+this.index);
       var instances = M.Dropdown.init([elems], {"container":div});
     }
     catch (err){
       console.warn(err);
     }

   },100);
  }
  setItem(p) {
    this.selected = p;
  }
}
