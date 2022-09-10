<template>
  <h1 class="title">Cadastrar novo PET</h1>
  <div class="box form">
    <div class="columns">
      <div class="column is-6" role="form" aria-label="Formulário para cadastro de um novo Pet">
        <input type="text" class="input" placeholder="Qual o nome do pet?" v-model="name" />
        <input type="number" class="input" placeholder="Qual a idade dele?" v-model="age" />
        <input type="text" class="input" placeholder="Qual raça?" v-model="breed" />
      </div>
      <div class="column is-3">
        <div class="field">
          <label for="type" class="label">
            Selecione o tipo
          </label>
          <div class="select">
            <select v-model="type">
              <option value="none" selected>Selecione o tipo</option>
              <option value="gato">Gato</option>
              <option value="cachorro">Cachorro</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label for="idOwner" class="label">
            Selecione o dono
          </label>
          <div class="select">
            <select v-model="idOwner">
              <option value="none">Selecione o dono</option>
              <option v-for="owner in owners" :value="owner.id" :key="owner.id">{{ owner.name }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="field">
      <button class="button" @click="registerPet()">
        Salvar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from '@/store';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: "Form",
  setup(props, { emit }) {
    const store = useStore(key);
    const name = ref('');
    const age = ref(null);
    const type = ref('');
    const breed = ref('');
    const idOwner = ref('');
    const owners = computed(() => store.state.owner.owners)
    const registerPet = () => {
      emit('savePet', {
        name: name.value,
        age: age.value,
        type: type.value,
        breed: breed.value,
        owner: owners.value.find(owner => owner.id === idOwner.value)
      });
      name.value = '';
      age.value = null;
      type.value = '';
      breed.value = '';
    }
    return {
      idOwner,
      name,
      age,
      type,
      breed,
      registerPet,
      owners
    }
  },
  emits: ['savePet'],
});
</script>

<style>
.form {
  color: var(--text-primary);
  background: var(--bg-primary);
}

.form .input {
  margin-bottom: 1.2rem;
}
</style>