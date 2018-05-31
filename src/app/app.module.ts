import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './sections/home/home.component';
import {SectionComponent} from './sections/section.component';
import {ContentComponent} from './sections/content/content.component';
import {UICarouselModule} from 'ui-carousel';
import {OrmService} from './services/orm.service';
import {DataService} from './services/data.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {GoResultDirective} from './directives/go-result.directive';
import {FilterTitlesPipe} from './pipes/filter-titles';
import {SearchForPipe} from './pipes/search-for';
import {LiteSearchPipe} from './pipes/lite-search';
import {SearchInputComponent} from './components/search-input/search-input.component';
import {HeaderService} from './services/header.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';
import {ScrollTopDirective} from './directives/scroll.top.directive';
import {BehaviourService} from './services/behaviour.service';
import {IsmaelilloComponent} from './sections/ismaelillo/ismaelillo.component';
import {ContenidosComponent} from './sections/contenidos/contenidos.component';
import {DerechoComponent} from './sections/derecho/derecho.component';
import {BibliotecaComponent} from './sections/biblioteca/biblioteca.component';
import {OwlSliderDirective} from './directives/owl.slider.directive';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {GlosarioComponent} from "./sections/glosario/glosario.component";
import {EticaComponent} from './sections/etica/etica.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IsmaelilloComponent,
    ContenidosComponent,
    DerechoComponent,
    BibliotecaComponent,
    SectionComponent,
    ContentComponent,
    GlosarioComponent,
    EticaComponent,
    SearchInputComponent,
    GoResultDirective,
    ScrollTopDirective,
    OwlSliderDirective,
    FilterTitlesPipe,
    SearchForPipe,
    LiteSearchPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    AppRoutingModule,
    UICarouselModule,
    HttpClientModule,
    PdfViewerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [RouterModule, TranslateModule],
  providers: [OrmService, DataService, HeaderService, BehaviourService,  { provide: APP_BASE_HREF, useValue: '/' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
