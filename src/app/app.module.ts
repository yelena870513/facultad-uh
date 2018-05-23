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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SectionComponent,
    ContentComponent,
    SearchInputComponent,
    GoResultDirective,
    FilterTitlesPipe,
    SearchForPipe,
    LiteSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UICarouselModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [RouterModule, TranslateModule],
  providers: [OrmService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
