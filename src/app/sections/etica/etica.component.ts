import { Component, AfterViewInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {TranslateService} from '@ngx-translate/core';
import {HeaderService} from "../../services/header.service";
declare var $: any;

@Component({
  selector: 'app-etica',
  templateUrl: './etica.component.html',
  styleUrls: ['./etica.component.css']
})

export class EticaComponent implements AfterViewInit {
  books: any [];
  term: any;
  pointer: number;
  pdfPages: number;
  isLoaded: boolean = false;
  constructor(private dataService: DataService, private translate: TranslateService, private headerService: HeaderService) {
    this.headerService.Hide();
    this.dataService.getBooks(this.translate.currentLang).subscribe((data: any) => {
      this.books = data.docs.filter(f => f.tematica === 'etica');
      this.term = this.books[0];
    });
    /*PDF Viewer*/
    this.pointer = 1;
    this.pdfPages = 1;
  }

  ReadBook(item) {
    this.term = item;
    this.pointer = 1;
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

  private QuitOverFlow() {
    $('.ng2-pdf-viewer-container').css('overflow','inherit');
  }
  ngAfterViewInit() {
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }
}


