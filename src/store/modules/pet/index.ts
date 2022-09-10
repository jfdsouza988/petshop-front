import { State } from "@/store";
import { Module } from "vuex";
import { ADD_PET, EDIT_PET, GET_PETS, LOAD_PETS, REGISTER_PET, UPDATE_PET } from "./types";
import http from "@/http";
import IPet from "@/interfaces/IPet";

export interface StatePet {
  pets: IPet[];
}

export const pet: Module<StatePet, State> = {
  mutations: {
    [ADD_PET](state, pet: IPet) {
      const petData = {
        id: pet.id,
        name: pet.name,
        age: pet.age,
        breed: pet.breed,
        owner: pet.owner,
        type: pet.type,
      } as IPet;
      state.pets.push(petData);
    },
    [EDIT_PET](state, pet: IPet) {
      const petIndex = state.pets.findIndex((p) => p.id === pet.id);
      state.pets[petIndex] = pet;
    },
    [LOAD_PETS](state, pets: IPet[]) {
      state.pets = pets;
    },
  },
  actions: {
    [GET_PETS]({ commit }, filter: string) {
      let url = "/pets";
      if(filter) {
        url += `/search?name=${filter}`;
      }
      http.get(url).then((response) => {
        commit(LOAD_PETS, response.data);
      });
    },
    [REGISTER_PET]({ commit }, pet: IPet) {
      return http
        .post("/pets", {
          name: pet.name,
          breed: pet.breed,
          age: pet.age,
          ownerId: pet.owner.id,
          type: pet.type,
        })
        .then(() => {
          commit(ADD_PET, pet);
        });
    },
    [UPDATE_PET]({ commit }, pet: IPet) {
      return http.put(`/pets/${pet.id}`, pet).then(() => {
        commit(EDIT_PET, pet);
      });
    },
  },
};
