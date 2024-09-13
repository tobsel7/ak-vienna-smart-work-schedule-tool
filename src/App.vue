<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <header class="flex items-center p-4 bg-red-500 text-white">
    <div class="mr-4 cursor-pointer" @click="toggleMenu">
      &#9776; <!-- Burger icon -->
    </div>
    <div :class="['flex flex-col', { 'hidden': !isMenuOpen }]">
      <nav class="flex flex-col">
        <RouterLink to="/" exact class="p-2 hover:bg-red-600">AK Dienstplan Tool</RouterLink>
        <RouterLink to="/schedule" exact class="p-2 hover:bg-red-600">Dienstplanerstellung</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
