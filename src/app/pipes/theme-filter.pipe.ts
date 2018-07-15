import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'themeFilter'
})
export class ThemeFilterPipe implements PipeTransform {

  transform(collection: any[], theme: any): any {
    //noinspection TypeScriptUnresolvedFunction
    if (_.isUndefined(theme)) {
      return collection.sort((a: any, b: any) => a.order - b.order);

    }
    //noinspection TypeScriptUnresolvedFunction
    return _.isUndefined(collection)?[]:collection.filter((f: any) => f.theme === theme).sort((a: any, b: any) => a.order - b.order);
  }

}
