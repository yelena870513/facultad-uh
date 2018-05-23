import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


@Pipe({ name: 'liteSearch' })
export class LiteSearchPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(html: any, search: string) {
    if (!html) {
      return;
    }
    if (!search) {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    let exp = search;

    exp = exp.replace(/a/gi, '[a|á]');
    exp = exp.replace(/e/gi, '[e|é]');
    exp = exp.replace(/i/gi, '[i|í]');
    exp = exp.replace(/o/gi, '[o|ó]');
    exp = exp.replace(/u/gi, '[u|ú]');

    /* case-insensitive search */

    const regEx = new RegExp(exp, 'gi');

    const full = html.replace(new RegExp(exp, 'gi'), '<span class="highlightedText">$&</span>');

    return this.sanitizer.bypassSecurityTrustHtml(full);
  }
}
