import {Directive, ElementRef} from '@angular/core';
import {BehaviourService} from '../services/behaviour.service';
declare var $: any;
@Directive({
  selector: '[appScrollTop]',
})

export class ScrollTopDirective {
  constructor(private el: ElementRef, private behave: BehaviourService) {
    this.behave.readMode.subscribe(readMode => {
      if (readMode) {
        $('body,html').animate({
          scrollTop: 0
        }, 600);
      }
    });
  }
}
