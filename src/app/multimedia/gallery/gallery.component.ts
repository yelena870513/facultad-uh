import { Component, OnInit, AfterViewInit } from '@angular/core';
import {HeaderService} from '../../services/header.service';
declare var M: any;
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit {

  constructor(private headerService: HeaderService) {  this.headerService.Hide();}

  ngOnInit() {
  }

  ngAfterViewInit(){
    const elems = document.querySelectorAll('.carousel');
    const instances = M.Carousel.init(elems, {});
  }

}
