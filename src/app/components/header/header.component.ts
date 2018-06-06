import { AfterViewInit, Component} from '@angular/core';
import {MenuInterface} from '../../interfaces/menu.interface';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';

import {HeaderService} from '../../services/header.service';
import {BehaviourService} from '../../services/behaviour.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css' ]
})

export class HeaderComponent implements AfterViewInit {
  menu: MenuInterface[];
  showHeader = true;
  constructor(

    private headerService: HeaderService,
    private behave: BehaviourService,
    private router: Router) {
       this.menu = [
      {name: 'NAV.HOME', url: '/home' },
      {name: 'NAV.ESTUDIANTES', url: '/question' },
      {name: 'NAV.PROFESORES', url: '/profesores' }
      ];
     this.headerService.showHeader
       .subscribe(show => setTimeout(() => this.showHeader = show));
  }

  ngAfterViewInit() {

    ///////////////////////////
    // Scrollspy
    $('body').scrollspy({
      target: '#nav',
      offset: $(window).height() / 2
    });

    ///////////////////////////
    // Smooth scroll
    $('#nav .main-nav a[href^=\'#\']').on('click', function(e) {
      e.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(this.hash).offset().top
      }, 600);
    });

    ///////////////////////////
    // Btn nav collapse
    $('#nav .nav-collapse').on('click', function() {
      $('#nav').toggleClass('open');
    });


    ///////////////////////////
    // Mobile dropdown
    $('.has-dropdown a').on('click', function() {
      $(this).parent().toggleClass('open-drop');
    });
    // Move to about
    $('.white-btn').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $('#about').offset().top
      }, 600);
    });
  }
  launchSearch(event) {
    this.behave.CastSearchMode(event.target.value);
    this.router.navigate(['/content/' + event.target.value]);
  }

}
