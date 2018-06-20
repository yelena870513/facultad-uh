import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class HeaderService {
  showHeader = new EventEmitter();
  childActive = new EventEmitter();
  constructor() { }
  Show() {
    this.showHeader.emit(true);
  }
  Hide() {
    this.showHeader.emit(false);
  }

  ChildActive(emitter){
    this.childActive.emit(emitter);
  }
}
