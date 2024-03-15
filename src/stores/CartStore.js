import { defineStore, acceptHMRUpdate } from 'pinia';
import _ from 'lodash';
import { useAuthUserStore } from './AuthUserStore';
export const useCartStore = defineStore('CartStore', {
  state: () => {
    return {
      items: [],
    };
  },

  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => {
      const grouped = _.groupBy(state.items, (item) => item.name);
      const sorted = Object.keys(grouped).sort();
      let inOrder = {};
      sorted.forEach((key) => (inOrder[key] = grouped[key]));

      return inOrder;
    },
    groupCount: (state) => (name) => state.grouped[name].length,
    total: (state) => _.sum(state.items.map((i) => i.price)),
  },

  actions: {
    checkout() {
      const authUserStore = useAuthUserStore();
      alert(
        `${authUserStore.username} just bougth ${this.total} items at a total of $${this.total}`
      );
    },
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
    clearItem(name) {
      this.items = this.items.filter((t) => t.name !== name);
    },

    setItemCount(item, count) {
      this.clearItem(item.name);
      this.addItems(count, item);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
