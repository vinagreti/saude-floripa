import { getActionTypeFromInstance } from '@ngxs/store';
import { ClearStore } from '@services/store';

export function ClearStoreReaducer(state, action, next) {
  if (getActionTypeFromInstance(action) === ClearStore.type) {
    state = { };
  }
  return next(state, action);
}
