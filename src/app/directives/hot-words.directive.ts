import { Directive, ElementRef, HostListener } from '@angular/core';
declare var M: any;
@Directive({
  selector: '[appHotWords]'
})
export class HotWordsDirective {

  constructor(private el: ElementRef) {

  }

  @HostListener('click') onClick() {
    switch (this.el.nativeElement.innerHTML){
      case 'Estado':
        M.toast({html: 'Estado Cubano'});
        break;
      default:
        break;
    }
  }

}
