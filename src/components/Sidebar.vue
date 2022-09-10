<template>
  <header>
    <h1>
      <img src="../assets/logo.png" width="200" alt="PetShop" />
    </h1>
    <div class="has-text-centered">
      <nav class="panel mt-5">
        <ul>
          <li>
            <router-link to="/" class="link">
              <i class="fas fa-tasks"></i>
              Pets
            </router-link>
          </li>
          <li>
            <router-link to="/owners" class="link">
              <i class="fas fa-project-diagram"></i>
              Cuidadores
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Sidebar',
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #FAF0CA;
}

.link.router-link-active {
  color: #FAF0CA;
}
</style>