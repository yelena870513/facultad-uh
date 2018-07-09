import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class HeaderService {
  showHeader = new EventEmitter();
  displayHeader = new EventEmitter();
  childActive = new EventEmitter();
  constructor() { }
  Show() {
    this.showHeader.emit(true);
  }
  Hide() {
    this.showHeader.emit(false);
  }

  Display(display){
    this.displayHeader.emit(display);
  }

  ChildActive(emitter){
    this.childActive.emit(emitter);
  }
}
