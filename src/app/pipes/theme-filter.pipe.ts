import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'themeFilter'
})
export class ThemeFilterPipe implements PipeTransform {

  transform(collection: any[], theme: any): any {
    return collection.filter((f: any) => f.theme === theme);
  }

}
