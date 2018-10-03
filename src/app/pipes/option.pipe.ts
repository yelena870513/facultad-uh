import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'option'
})
export class OptionPipe implements PipeTransform {

  transform(value: any[], args: any): any {
    //noinspection TypeScriptUnresolvedFunction
    if (_.isUndefined(value)) {
      return value;
    }
    if (args == 'ismaelillo') {
      //noinspection TypeScriptUnresolvedFunction
      return value.filter((v: any) => _.isUndefined(v.option));
    }
    return value.filter((v: any) => v.option === args);
  }

}
