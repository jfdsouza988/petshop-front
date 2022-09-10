import INotification from "@/interfaces/INotification";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  NOTIFY,
} from "./types";
import { StatePet, pet } from "./modules/pet";
import { StateOwner, owner } from "./modules/owner";

export interface State {
  pet: StatePet;
  owner: StateOwner;
  notifications: INotification[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    notifications: [],
    owner: {
      owners: [],
    },
    pet: {
      pets: [],
    },
  },
  mutations: {
    [NOTIFY](state, notification: INotification) {
      notification.id = new Date().getTime();
      state.notifications.push(notification);
      setTimeout(() => {
        const notificationIndex = state.notifications.findIndex(
          (n) => n.id === notification.id
        );
        state.notifications.splice(notificationIndex, 1);
      }, 3000);
    },
  },
  modules: {
    owner,
    pet,
  },
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
