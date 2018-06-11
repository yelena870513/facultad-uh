import { AfterViewInit, Component} from '@angular/core';
import {MenuInterface} from '../../interfaces/menu.interface';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderService} from '../../services/header.service';
import {BehaviourService} from '../../services/behaviour.service';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../modal/modal.component';
declare var $: any;
declare var win: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', 'modal.css' ]
})

export class HeaderComponent implements AfterViewInit {
  menu: MenuInterface[];
  showHeader = true;
  modal : any;
  constructor(

    private headerService: HeaderService,
    private modalService: NgbModal,
    private behave: BehaviourService,
    private router: Router) {
       this.menu = [
      {name: 'NAV.HOME', url: '/landing' },
      {name: 'NAV.ESTUDIANTES', url: '/question' },
      {name: 'NAV.PROFESORES', url: '/profesores' }
      ];
     this.headerService.showHeader
       .subscribe(show => setTimeout(() => this.showHeader = show));
  }

  Salir(){
    $('.modal').modal('open');
  }

  LogOut(){

    //Preguntar primero desde que dispositivo se navega
    if(!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/))
    {
      try
      {
        win.close(true);
      }
      catch (reason){
        window.close();

      }

    }
    else
    {
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

    $(document).ready(function(){
     this.modal = $('.modal').modal();
    });
  }
  launchSearch(event) {
    this.behave.CastSearchMode(event.target.value);
    this.router.navigate(['/content/' + event.target.value]);
  }

}
