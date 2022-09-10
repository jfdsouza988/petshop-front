<template>
  <Box>
    <div class="columns clickable" @click="selectedPet">
      <div class="column is-4">
        {{ pet.name || 'Pet sem identificação' }}
      </div>
      <div class="column is-3">
        {{ pet.owner?.name || 'N/D' }}
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Box from './Box.vue';
import IPet from '@/interfaces/IPet';
export default defineComponent({
  name: "PetCard",
  emits: ['selectedPet'],
  props: {
    pet: {
      type: Object as PropType<IPet>,
      required: true
    }
  },
  methods: {
    selectedPet() {
      this.$emit('selectedPet', this.pet);
    }
  },
  components: { Box }
});
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>

