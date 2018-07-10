import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../services/header.service";
import {DataService} from "../../services/data.service";
import {CategoryInterface} from "../../interfaces/category.interface";
import {TranslateService} from '@ngx-translate/core';
import {FooterService} from "../../services/footer.service";
import {VgAPI} from 'videogular2/core';
import {Router} from '@angular/router';
declare var window: any
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{

  categories: CategoryInterface [];
  menu: any [];
  api: VgAPI;
  constructor(
    private dataService: DataService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private footerService: FooterService,
    private router: Router) {
    this.headerService.Hide();
    this.headerService.Display(false);
    this.headerService.ChildActive(true);
    this.footerService.Show();
  }
  onPlayerReady(api: VgAPI){
    this.api = api;
    this.api.subscriptions.ended.subscribe(() =>{
      this.headerService.Display(true);
        this.router.navigate(['/home']);
    })
  }

  goHome(){
    this.headerService.Display(true);
    this.router.navigate(['/home']);
  }

  ngOnInit(){
    window.sessionStorage.setItem('landing','landing');
  }
}
