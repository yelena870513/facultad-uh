import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class FooterService {
  showFooter = new EventEmitter();
  constructor() { }
  Show() {
    this.showFooter.emit(true);
  }
  Hide() {
    this.showFooter.emit(false);
  }
}
