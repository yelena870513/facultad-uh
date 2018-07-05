import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class BehaviourService {
  readMode = new EventEmitter();
  seekMode = new EventEmitter();
  teamMode = new EventEmitter();
  constructor() { }
  CastReadMode(mode: any) {
    this.readMode.emit(mode);
    }
  CastSearchMode(mode: any) {
     this.seekMode.emit(mode);
  }
  CastTeamMode(mode: any) {
    this.teamMode.emit(mode);
  }
}
