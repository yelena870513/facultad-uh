import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'filterTitles' })
export class FilterTitlesPipe implements PipeTransform {
  transform(content: any [], category: string) {
    return content.filter(item => item.category === category);
  }
}
