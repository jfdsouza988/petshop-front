<template>
  <Form @savePet="addPet" />
  <div class="list">
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="email" placeholder="Digite para filtrar" v-model="filter">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <PetCard v-for="pet in pets" :key="pet.id" :pet="pet" @selectedPet="selectPet" />
    <Box v-if="petsIsEmpty">
      Você não possui nenhum pet cadastrado :(
    </Box>
    <Modal :show="selectedPet != null" v-if="selectedPet">
      <template v-slot:header>
        <p class="modal-card-title">Editando dados de um Pet</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </template>
      <template v-slot:body>
        <div class="field">
          <label for="petName" class="label">
            Nome
          </label>
          <input type="text" class="input" v-model="selectedPet.name" id="petName" />
        </div>
        <div class="field">
          <label for="petAge" class="label">
            Idade
          </label>
          <input type="number" class="input" v-model="selectedPet.age" id="petAge" />
        </div>
        <div class="field">
          <label for="petBreed" class="label">
            Raça
          </label>
          <input type="text" class="input" v-model="selectedPet.breed" id="petBreed" />
        </div>
        <div class="field">
          <label for="petType" class="label">
            Tipo
          </label>
          <input type="text" class="input" v-model="selectedPet.type" id="petType" />
        </div>
      </template>
      <template v-slot:footer>
        <button class="button is-success" @click="updatePet">Salvar alterações</button>
        <button class="button" @click="closeModal">Cancelar</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Form from '../components/Form.vue';
import Box from '../components/Box.vue';
import PetCard from '@/components/PetCard.vue';
import { useStore } from '@/store';
import { NotificationType } from '@/interfaces/INotification';
import useNotificator from '@/hooks/notificator';
import Modal from '../components/Modal.vue';
import IPet from '@/interfaces/IPet';
import { GET_PETS, REGISTER_PET, UPDATE_PET } from '@/store/modules/pet/types';
import { GET_OWNERS } from '@/store/modules/owner/types';
export default defineComponent({
  name: 'App',
  components: {
    Form,
    PetCard,
    Box,
    Modal,
  },
  data() {
    return {
      selectedPet: null as IPet | null
    };
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_PETS);
    store.dispatch(GET_OWNERS);
    const { notify } = useNotificator();
    const filter = ref('');
    watchEffect(() => {
      store.dispatch(GET_PETS, filter.value);
    });
    return {
      store,
      notify,
      filter,
      pets: computed(() => store.state.pet.pets),
    }
  },
  computed: {
    petsIsEmpty(): boolean {
      return this.pets.length === 0;
    }
  },
  methods: {
    addPet(pet: IPet) {
      this.store.dispatch(REGISTER_PET, pet).then(() => {
        this.handleSuccess();
      });
    },
    handleSuccess() {
      this.notify(NotificationType.SUCCESS, 'Sucesso', 'Pet adicionado com sucesso');
    },
    selectPet(pet: IPet) {
      this.selectedPet = pet;
    },
    closeModal() {
      this.selectedPet = null;
    },
    updatePet() {
      this.store.dispatch(UPDATE_PET, this.selectedPet).then(() => {
        this.handleSuccess();
        this.closeModal();
      });
    }
  }
});
</script>

<style scoped>
.list {
  padding: 1.25rem;
}
</style>