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
//noinspection TypeScriptCheckImport
import {NgxPaginationModule} from 'ngx-pagination';
import {ScrollTopDirective} from './directives/scroll.top.directive';
import {BehaviourService} from './services/behaviour.service';
import {IsmaelilloComponent} from './sections/ismaelillo/ismaelillo.component';
import {ContenidosComponent} from './sections/contenidos/contenidos.component';
import {DerechoComponent} from './sections/derecho/derecho.component';
import {BibliotecaComponent} from './sections/biblioteca/biblioteca.component';
import {OwlSliderDirective} from './directives/owl.slider.directive';
import {MaterialDropDownDirective} from './directives/material.dropdown.directive';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {GlosarioComponent} from './sections/glosario/glosario.component';
import {EticaComponent} from './sections/etica/etica.component';
import { QuestionComponent } from './sections/question/question.component';
import {NgDragDropModule} from 'ng-drag-drop';
import {SelectableComponent} from './sections/question/selectable.component';
import { ProfesoresComponent } from './sections/profesores/profesores.component';
import { LandingComponent } from './sections/landing/landing.component';
import {FooterService} from "./services/footer.service";
import {IsChildPipe} from "./pipes/is-child";
import {HighlightsPipe} from "./pipes/highlights";

import { GalleryComponent } from './multimedia/gallery/gallery.component';
import { PlaylistComponent } from './multimedia/playlist/playlist.component';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { LightboxModule } from 'ngx-lightbox';
import { ThemeFilterPipe } from './pipes/theme-filter.pipe';
import { HotWordsDirective } from './directives/hot-words.directive';
import { OptionPipe } from './pipes/option.pipe';
import { WordFilterPipe } from './pipes/word-filter.pipe';
import { WordExcludePipe } from './pipes/word-exclude.pipe';
import { CreditosComponent } from './sections/creditos/creditos.component';
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
    GlosarioComponent,
    EticaComponent,
    SearchInputComponent,
    GoResultDirective,
    ScrollTopDirective,
    OwlSliderDirective,
    MaterialDropDownDirective,
    FilterTitlesPipe,
    SearchForPipe,
    LiteSearchPipe,
    IsChildPipe,
    QuestionComponent,
    SelectableComponent,
    ProfesoresComponent,
    LandingComponent,
    GalleryComponent,
    PlaylistComponent,
    ThemeFilterPipe,
    HighlightsPipe,
    HotWordsDirective,
    OptionPipe,
    WordFilterPipe,
    WordExcludePipe,
    CreditosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    AppRoutingModule,
    UICarouselModule,
    HttpClientModule,
    PdfViewerModule,
    NgDragDropModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    LightboxModule
  ],
  exports: [RouterModule, TranslateModule],
  providers: [OrmService, DataService, HeaderService, FooterService, BehaviourService,  { provide: APP_BASE_HREF, useValue: '.' },],
  entryComponents:[SelectableComponent,],
  bootstrap: [AppComponent]
})
export class AppModule { }
