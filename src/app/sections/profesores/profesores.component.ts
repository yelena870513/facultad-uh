import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {HeaderService} from "../../services/header.service";
import {TranslateService} from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  books= [];
  reader: any;
  pointer = 1;
  pdfPages = 1;
  isLoaded = false;
  constructor(private headerService: HeaderService, private dataService: DataService, private translate: TranslateService) {
    this.headerService.Hide();
    this.headerService.ChildActive(false);
    this.dataService.getBooks(this.translate.currentLang).subscribe((data: any) => {
      this.books = data.docs.filter(f => f.tematica === 'profesores');
      this.reader = this.books[0];
    });
  }

  ngOnInit() {
  }
  ReadBook(book){
    this.reader = book;
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

}
