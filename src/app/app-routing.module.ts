import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './sections/home/home.component';
import {IsmaelilloComponent} from './sections/ismaelillo/ismaelillo.component';
import {ContenidosComponent} from './sections/contenidos/contenidos.component';
import {DerechoComponent} from './sections/derecho/derecho.component';
import {BibliotecaComponent} from './sections/biblioteca/biblioteca.component';
import {GlosarioComponent} from './sections/glosario/glosario.component';
import {EticaComponent} from './sections/etica/etica.component';
import {QuestionComponent} from './sections/question/question.component';
import {ProfesoresComponent} from "./sections/profesores/profesores.component";
import {LandingComponent} from "./sections/landing/landing.component";
import {GalleryComponent} from './multimedia/gallery/gallery.component';
import {PlaylistComponent} from './multimedia/playlist/playlist.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'ismaelillo', component: IsmaelilloComponent},
  {path: 'contenidos', component: ContenidosComponent},
  {path: 'derecho', component: DerechoComponent},
  {path: 'biblioteca', component: BibliotecaComponent},
  {path: 'glosario', component: GlosarioComponent},
  {path: 'etica', component: EticaComponent},
  {path: 'question', component: QuestionComponent},
  {path: 'profesores', component: ProfesoresComponent},
  {path: 'landing', component: LandingComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'playlist', component: PlaylistComponent}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
