import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'themeFilter'
})
export class ThemeFilterPipe implements PipeTransform {

  transform(collection: any[], theme: any): any {
    if (_.isUndefined(theme)) {
      return collection;
    }
    return _.isUndefined(collection)?[]:collection.filter((f: any) => f.theme === theme);
  }

}
