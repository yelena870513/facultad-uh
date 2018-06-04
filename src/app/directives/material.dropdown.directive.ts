import {Directive, ElementRef} from '@angular/core';
import {BehaviourService} from '../services/behaviour.service';
declare var M: any;
@Directive({
  selector: '[appMaterialDropDown]',
})

export class MaterialDropDownDirective {
  constructor(private el: ElementRef, private behave: BehaviourService) {
    setTimeout(() => {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems, {});
    },500)

  }
}
