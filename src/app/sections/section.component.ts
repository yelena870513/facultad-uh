import { AfterViewInit, Component} from '@angular/core';
 declare var $: any;
@Component({
  selector: 'app-section',
  template: `<router-outlet></router-outlet>
  <app-footer></app-footer>
  <!-- Back to top -->
  <div id="back-to-top"></div>
  <!-- /Back to top -->

  <!-- Preloader -->
  <div id="preloader">
    <div class="preloader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <!-- /Preloader -->
  `,
  styles: ['#back-to-top {background: burlywood;}']
})

export class SectionComponent implements AfterViewInit {
  ngAfterViewInit() {
    ///////////////////////////
    // Smooth scroll
    $('#nav .main-nav a[href^=\'#\']').on('click', function(e) {
      e.preventDefault();
      const hash = this.hash;
      $('html, body').animate({
        scrollTop: $(this.hash).offset().top
      }, 600);
    });

    $('#back-to-top').on('click', function(){
      $('body,html').animate({
        scrollTop: 0
      }, 600);
    });

    ///////////////////////////
    // On Scroll
    $(window).on('scroll', function() {
      const wScroll = $(this).scrollTop();

      // Fixed nav
      wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

      // Back To Top Appear
      wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
    });

    ///////////////////////////
    // magnificPopup
    $('.work').magnificPopup({
      delegate: '.lightbox',
      type: 'image'
    });
  }
}
