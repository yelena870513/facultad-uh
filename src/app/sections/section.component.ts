import { AfterViewInit, Component} from '@angular/core';
declare var Cufon: any;
@Component({
  selector: 'app-section',
  template: `<router-outlet></router-outlet><app-footer></app-footer>`
})

export class SectionComponent implements AfterViewInit {
  ngAfterViewInit() {
    Cufon.now();
  }
}
