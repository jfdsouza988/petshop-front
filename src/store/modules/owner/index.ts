import { State } from "@/store";
import { Module } from "vuex";
import { ADD_OWNER, DELETE_OWNER, EDIT_OWNER, GET_OWNERS, LOAD_OWNERS, REGISTER_OWNER, REMOVE_OWNER, UPDATE_OWNER } from "./types";
import http from "@/http";
import IOwner from "@/interfaces/IOwner";

export interface StateOwner {
  owners: IOwner[];
}

export const owner: Module<StateOwner, State> = {
  mutations: {
    [ADD_OWNER](state, owner: IOwner) {
      const ownerData = {
        id: owner.id,
        name: owner.name,
        phone: owner.phone,
        address: owner.address,
      } as IOwner;
      state.owners.push(ownerData);
    },
    [EDIT_OWNER](state, owner: IOwner) {
      const ownerIndex = state.owners.findIndex((o) => o.id === owner.id);
      state.owners[ownerIndex] = owner;
    },
    [REMOVE_OWNER](state, ownerId: string) {
      const ownerIndex = state.owners.findIndex((o) => o.id === ownerId);
      state.owners.splice(ownerIndex, 1);
    },
    [LOAD_OWNERS](state, owners: IOwner[]) {
      state.owners = owners;
    },
  },
  actions: {
    [GET_OWNERS]({ commit }) {
      http.get("/owners").then((response) => {
        commit(LOAD_OWNERS, response.data);
      });
    },
    [REGISTER_OWNER](context, owner: IOwner) {
      return http.post("/owners", {
        name: owner.name,
        phone: owner.phone,
        address: owner.address,
      });
    },
    [UPDATE_OWNER](context, owner: IOwner) {
      return http.put(`/owners/${owner.id}`, owner);
    },
    [DELETE_OWNER]({ commit }, ownerId: string) {
      return http.delete(`/owners/${ownerId}`).then(() => {
        commit(REMOVE_OWNER, ownerId);
      });
    },
  },
};
