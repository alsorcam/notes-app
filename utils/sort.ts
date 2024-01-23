import type { Note } from '../types/note';
import { SortBy } from '../types/sort';

export const SORT_NOTES: Record<SortBy, Function> = {
  [SortBy.NEWEST]: (list: Array<Note>) =>
    list.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime()),
  [SortBy.OLDEST]: (list: Array<Note>) =>
    list.sort((a, b) => a.creationDate.getTime() - b.creationDate.getTime()),
  [SortBy.A_Z]: (list: Array<Note>) => {
    list.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  },
  [SortBy.Z_A]: (list: Array<Note>) => {
    list.sort((a, b) => {
      if (a.title > b.title) {
        return -1;
      }
      if (a.title < b.title) {
        return 1;
      }
      return 0;
    });
  },
};
