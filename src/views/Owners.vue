<template>
  <div class="owners">
    <h1 class="title">Donos de Pets</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Owners',
});
</script>

<style scoped>
  .owners {
    padding: 1.25rem;
  }
  </style>