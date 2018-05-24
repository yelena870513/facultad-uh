import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class HeaderService {
  showHeader = new EventEmitter();
  constructor() { }
  Show() {
    this.showHeader.emit(true);
  }
  Hide() {
    this.showHeader.emit(false);
  }
}
