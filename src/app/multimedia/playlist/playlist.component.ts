import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HeaderService} from '../../services/header.service';
import {DataService} from '../../services/data.service';
import {TranslateService} from '@ngx-translate/core';

declare var M: any;

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit, AfterViewInit {
  gallery: any[];
  player: any;

  private base = './assets/video/';
  private poster = './assets/images/';
  constructor(private headerService: HeaderService,
              private dataService: DataService,
              private translate: TranslateService) {
    this.headerService.Hide();
    this.dataService.getGallery(this.translate.currentLang).subscribe((data: any) =>{
      this.gallery = data.docs.filter((f:any) => f.type === "video")
        .sort((a: any, b: any) => a.order - b.order)
        .map((i: any) => {
          i.src = this.base + i.src;
          i.poster = this.poster + i.poster;
          return i;
        })
      ;
      this.player = this.gallery[0];
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const elems = document.querySelectorAll('.carousel');
    setTimeout(() => {M.Carousel.init(elems, {})},200);
  }

  setPlayer(player: any){
    this.player = player;
    const video = <HTMLVideoElement> document.getElementById('singleVideo');
    video.load();

  }

}
