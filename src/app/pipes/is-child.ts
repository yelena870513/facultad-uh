import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'isChild' })
export class IsChildPipe implements  PipeTransform{
  transform(needle:any) {
    return ['/ismaelillo', '/derecho', '/glosario', '/biblioteca', '/etica', '/ismaelillo'].indexOf(needle)!=-1;
  }
}
