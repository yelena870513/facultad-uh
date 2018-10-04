import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'wordExclude'
})
export class WordExcludePipe implements PipeTransform {

  transform(collection: any, theme?: any): any {
    //noinspection TypeScriptUnresolvedFunction
    return _.isUndefined(collection)?[]:collection.filter((f: any) => f !== theme);
  }

}
