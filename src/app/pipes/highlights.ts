import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


@Pipe({ name: 'highlights' })
export class HighlightsPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(html: any, criteria: string) {
    if (!criteria) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    let exp = criteria;

    const html2 = html.replace(/<\/?[^>]+(>|$)/g, '');

    exp = exp.replace(/a/gi, '[a|á]');
    exp = exp.replace(/e/gi, '[e|é]');
    exp = exp.replace(/i/gi, '[i|í]');
    exp = exp.replace(/o/gi, '[o|ó]');
    exp = exp.replace(/u/gi, '[u|ú]');

    /* case-insensitive search */

    const regEx = new RegExp(exp, 'gi');

    const pos = html2.search(regEx);

    const wordLength = criteria.length;

    let ini = pos - 30;
    let fini = pos + wordLength + 100;
    let beforeSearch = '';
    if (ini < 0) {
      ini = 0;
       beforeSearch = html2.slice(ini, pos);
    } else {
      const test = html2.slice(ini, pos);
      const space = test.indexOf(' ');
      let nextToSpace = 0;

      if (space !== -1) {
        nextToSpace = space + 1;
      }

      beforeSearch = test.substr(nextToSpace, test.length);

    }

    if (fini > html2.length) {
      fini = html2.length;
    }

    const afterSearch = html2.substring(pos + wordLength, fini);

    const dword = html2.substr(pos, wordLength);

    const todo = beforeSearch + dword + afterSearch;

    let last = todo.substr(0, Math.min(todo.length, todo.lastIndexOf(' ')));

    last = last + ' ...';


    const res = last.replace(new RegExp(exp, 'gi'), '<span class="highlightedText">$&</span>');

    return this.sanitizer.bypassSecurityTrustHtml(res);
  }
}
