import {AfterViewInit, Component} from '@angular/core';
import {MenuInterface} from '../../interfaces/menu.interface';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderService} from '../../services/header.service';
import {BehaviourService} from '../../services/behaviour.service';
import {fromPromise} from 'rxjs/observable/fromPromise';
declare var $: any;
declare var win: any;
declare var window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', 'modal.css']
})

export class HeaderComponent implements AfterViewInit {
  menu: any[];
  showHeader = true;
  displayHeader = true;
  childActive = false;
  modal: any;

  constructor(private headerService: HeaderService,
              private behave: BehaviourService,
              private router: Router) {
    this.menu = [
      {name: 'NAV.START', url: '/home'},
      {
        name: 'NAV.HOME',
        url: '#',
        hasChild: true,
        children: [
          {name: 'NAV.ISMAELILLO', url: '/ismaelillo'},
          { name: 'NAV.CONTENIDOS',    url: '/contenidos'},
          {name: 'NAV.DERECHO', url: '/derecho'}, {name: 'NAV.BIBLIOTECA', url: '/biblioteca'},]
      },
      {name: 'NAV.ESTUDIANTES', url: '/question'},
      {name: 'NAV.PROFESORES', url: '/profesores'},
      {name: 'NAV.MULTIMEDIA', url: '#',
        hasChild: true,
        children:[
        {name: 'NAV.GALLERY', url: '/gallery'},
        {name: 'NAV.PLAYLIST', url: '/playlist'},
      ]}
    ];
    this.headerService.showHeader
      .subscribe(show => setTimeout(() => this.showHeader = show));

    this.headerService.displayHeader
      .subscribe((display) => this.displayHeader = display);
    this.headerService.childActive.subscribe(active => setTimeout(()=> this.childActive = active))
  }

  Salir() {
    $('.modal').modal('open');
  }

  LogOut() {

    //Preguntar primero desde que dispositivo se navega
    if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
      try {
        window.sessionStorage.setItem('landing',undefined);
        win.close(true);
      }
      catch (reason) {
        window.close();

      }

    }
    else {
      window.close();


    }
    $('.modal').modal('close');
  }

  ngAfterViewInit() {
    $('#nav').addClass('hidden');

    ///////////////////////////
    // Scrollspy
    $('body').scrollspy({
      target: '#nav',
      offset: $(window).height() / 2
    });

    ///////////////////////////
    // Smooth scroll
    $('#nav .main-nav a[href^=\'#\']').on('click', function (e) {
      e.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(this.hash).offset().top
      }, 600);
    });


    $(window).on('scroll', function () {
      const wScroll = $(this).scrollTop();

      // Fixed nav
      wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

      // Back To Top Appear
      wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
    });

    ///////////////////////////
    // Btn nav collapse
    $('#nav .nav-collapse').on('click', function () {
      $('#nav').toggleClass('open');
    });


    ///////////////////////////
    // Mobile dropdown
    $('.has-dropdown a').on('click', function () {
      $(this).parent().toggleClass('open-drop');
    });
    // Mobile dropdown
    $('.has-dropdown a').on('mouseover', function () {
      $(this).parent().toggleClass('open-drop');
    });
    // Mobile dropdown
    $('.has-dropdown a').on('mouseout', function () {
      $(this).parent().toggleClass('open-drop');
    });
    // Move to about
    $('.white-btn').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $('#about').offset().top
      }, 600);
    });

    $(document).ready(function () {
      this.modal = $('.modal').modal();
    });
  }

  launchSearch(event) {
    this.behave.CastSearchMode(event.target.value);
    this.router.navigate(['/content/' + event.target.value]);
  }

}
