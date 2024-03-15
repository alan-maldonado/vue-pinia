import { defineStore } from 'pinia';
import _ from 'lodash';

export const useCartStore = defineStore('CartStore', {
  state: () => {
    return {
      items: [],
    };
  },

  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => _.groupBy(state.items, (item) => item.name),
    groupCount: (state) => (name) => state.grouped[name].length,
  },

  actions: {
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
  },
});
