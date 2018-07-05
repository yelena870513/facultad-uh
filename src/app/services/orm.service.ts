import {Injectable} from '@angular/core';
import * as PouchDB from 'pouchdb/lib';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {log} from 'util';

@Injectable()
export class OrmService {
  db: any;
  constructor() {
    this.db = PouchDB( 'manager', {'adapter': 'idb'});
    this.db.setMaxListeners(100);
  }

  createEntity(entity) {
    return fromPromise(this.db.post(entity));
  }
  updateEntity(entity) {
    if (Object.prototype.toString.call(entity) === '[object Array]') {
      return fromPromise(this.db.bulkDocs(entity));
    }
    return fromPromise(this.db.put(entity));
  }

  deleteEntity(entity) {
    if (Object.prototype.toString.call(entity) === '[object Array]') {
      return fromPromise(this.db.bulkDocs(entity));
    }
    return fromPromise(this.db.remove(entity._id, entity._rev));
  }
  loadFromArray(docs) {
    return this.updateEntity(docs);
  }

  getAllValidData() {
    return fromPromise(this.db.allDocs({
      include_docs: true,
    }));
  }
  setUpLocal() {
    const orm = this;
    const promise = this.db.get('_local/preloaded').then(function(doc) {}).
    catch (function(err) {
      if (err.name !== 'not_found') {
        throw err;
      }
      // we got a 404, so the local document doesn't exist. so let's preload!
      return orm.db.load('data/sao.json').then(function() {
        // create the local document to note that we've preloaded
        return orm.db.put({
          _id: '_local/preloaded',
        });
      });
    }).then(function() {
      return orm.db.allDocs({
        include_docs: true,
      });
    });
    return fromPromise(promise);
  }
  Close() {
    return fromPromise(this.db.close());
  }

  Clear() {
    return fromPromise(this.db.destroy());
  }
  Restart() {
    this.db = PouchDB( 'manager', {'adapter': 'idb'});
    this.db.setMaxListeners(100);
  }


}
