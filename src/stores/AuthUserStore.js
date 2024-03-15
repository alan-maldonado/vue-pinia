import { defineStore } from 'pinia';

export const useAuthUserStore = defineStore('AuthUser', {
  state: () => {
    return {
      username: 'alan_maldonado',
    };
  },

  actions: {
    visitTwitterProfile() {
      window.open(`https://twitter.com/${this.username}`);
    },
  },
});
