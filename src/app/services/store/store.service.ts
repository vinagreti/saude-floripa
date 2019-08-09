import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClearStore } from './store.actions';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private store: Store,
  ) { }

  clear() {
    return this.store.dispatch(new ClearStore());
  }

}
