import { Component } from '@angular/core';
import {FooterService} from "../../services/footer.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {
  showFooter = true;
  constructor(private footerService: FooterService) {
    this.footerService.showFooter
      .subscribe(show => setTimeout(() => this.showFooter = show));
  }
}
