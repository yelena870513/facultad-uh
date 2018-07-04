import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';




@Injectable()
export class DataService {
  constructor(private http: HttpClient) {
  }

  public getContent(lang: string): Observable<any> {
    return this.http.get('assets/data/multimedia.' + lang + '.json');
  }
  public getBooks(lang: string): Observable<any> {
    return this.http.get('assets/data/book.' + lang + '.json');
  }

  public getGlossary(lang: string): Observable<any> {
    return this.http.get('assets/data/glosario.' + lang + '.json');
  }
  public getQuestion(lang: string): Observable<any> {
    return this.http.get('assets/data/preguntas.' + lang + '.json');
  }
  public getCientifico(lang: string): Observable<any> {
    return this.http.get('assets/data/cientificos.' + lang + '.json');
  }
}
