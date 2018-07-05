import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'searchFor' })
export class SearchForPipe implements PipeTransform {
  transform(content: any [], searchString: string) {
    if (!searchString) {
      return [];
    }
    const result = [];
    searchString = searchString.toLowerCase();

    searchString = searchString.replace(/a/gi, '[a|á]');
    searchString = searchString.replace(/e/gi, '[e|é]');
    searchString = searchString.replace(/i/gi, '[i|í]');
    searchString = searchString.replace(/o/gi, '[o|ó]');
    searchString = searchString.replace(/u/gi, '[u|ú]');

    content.forEach(function(item){

      const temp = item.content.toLowerCase().replace(/<\/?[^>]+(>|$)/g, '');


      if ( temp.search(searchString) !== -1) {
        result.push(item);
      }

    });

    if (result.length > 0) {
      return result;
    } else {

    }
  }
}
