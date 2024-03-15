import { ref, reactive } from 'vue';
export function piniaHistoryPlugin({ pinia, app, store, options }) {
  if (!options.historyEnabled) return;

  const history = reactive([]);
  const future = reactive([]);
  const doingHistory = ref(false);
  history.push(JSON.stringify(store.$state));

  store.$subscribe((mutation, state) => {
    if (!doingHistory.value) {
      history.push(JSON.stringify(state));
      future.splice(0, future.length);
    }
  });

  return {
    history,
    future,
    undo: () => {
      if (history.length === 1) return;
      doingHistory.value = true;
      future.push(history.pop());
      store.$state = JSON.parse(history.at(-1));
      doingHistory.value = false;
    },
    redo: () => {
      const lastState = future.pop();
      if (!lastState) return;
      doingHistory.value = true;
      history.push(lastState);
      store.$state = JSON.parse(lastState);
      doingHistory.value = false;
    },
  };
}
