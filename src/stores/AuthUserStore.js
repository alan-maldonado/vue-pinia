import { defineStore } from 'pinia';

export const useAuthUserStore = defineStore('AuthUser', {
  state: () => {
    return {
      username: 'alan-maldonado',
    };
  },
});
