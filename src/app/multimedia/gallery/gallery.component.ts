import { Component, OnInit, AfterViewInit } from '@angular/core';
import {HeaderService} from '../../services/header.service';
import {DataService} from "../../services/data.service";
import {TranslateService} from '@ngx-translate/core';
import { Lightbox } from 'ngx-lightbox';
import * as _ from 'lodash';
declare var M: any;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit {

  gallery: any[];
  themes: any[];
  tema: string;
  page = 1;
  private base = './assets/images/';
  constructor(
    private headerService: HeaderService,
    private dataService: DataService,
    private translate: TranslateService,
    private _lightbox: Lightbox) {
    this.headerService.Hide();
    this.headerService.ChildActive(true);
    this.dataService.getGallery(this.translate.currentLang).subscribe((data: any) =>{
      this.gallery = data.docs.filter((f:any) => f.type === "img")
        .sort((a: any, b: any) => a.order - b.order)
        .map((i: any) => {
         i.src = this.base + i.src;
          return i;
        })
      ;
      //noinspection TypeScriptUnresolvedFunction
      this.themes = _.uniq(this.gallery.map((m: any) => m.theme));
      this.tema = 'SECTION.JURIDICA';
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    const elems = document.querySelectorAll('.carousel');
    setTimeout(() => {M.Carousel.init(elems, {})},200);
    // // const instances = M.Carousel.init(elems, {});
  }

  setTheme(theme){
    this.tema = theme;

  }
  open(image: any): void {
    // open lightbox
    const index = _.findIndex(this.gallery, (b: any) => b.src === image.src);
    this._lightbox.open(this.gallery, index);

  }

}
