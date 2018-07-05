import {Directive, ElementRef} from '@angular/core';
import {BehaviourService} from '../services/behaviour.service';
declare var $: any;
@Directive({
  selector: '[appOwlSlider]',
})

export class OwlSliderDirective {
  constructor(private el: ElementRef, private behave: BehaviourService) {
    this.behave.teamMode.subscribe(teamMode => {
      if (teamMode) {
        setTimeout(() => {
          $('#testimonial-slider').owlCarousel({
            loop: true,
            margin: 15,
            dots : true,
            nav: false,
            autoplay : true,
            responsive: {
              0: {
                items: 1
              },
              992: {
                items: 2
              }
            }
          });
        }, 200);
      }      else {
        $('#testimonial-slider').owlCarousel('destroy');
      }
    });
  }
}
