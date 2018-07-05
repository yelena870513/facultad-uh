import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HeaderService} from '../../services/header.service';
declare var M: any;
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit,AfterViewInit {

  constructor(private headerService: HeaderService) {  this.headerService.Hide();}

  ngOnInit() {
  }

  ngAfterViewInit(){
    const elems = document.querySelectorAll('.carousel');
    const instances = M.Carousel.init(elems, {});
  }

}
