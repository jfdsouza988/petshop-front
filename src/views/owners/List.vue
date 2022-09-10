<template>
  <section>
    <router-link to="/owners/new" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Cadastrar novo</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOME</th>
          <th>AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="owner in owners" :key="owner.id">
          <td>{{ owner.id }}</td>
          <td>{{ owner.name }}</td>
          <td>
            <router-link :to="`/owners/${owner.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="remove(owner.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import { DELETE_OWNER, GET_OWNERS } from '@/store/modules/owner/types';
export default defineComponent({
  name: 'List',
  methods: {
    remove(id: string) {
      this.store.dispatch(DELETE_OWNER, id);
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_OWNERS);
    return {
      store,
      owners: computed(() => store.state.owner.owners)
    }
  }
});
</script>