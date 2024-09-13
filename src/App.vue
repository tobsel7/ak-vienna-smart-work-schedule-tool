<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <header class="flex items-center p-4 bg-yellow-500 text-white">
    <div class="mr-4 cursor-pointer" @click="toggleMenu">
      &#9776; <!-- Burger icon -->
    </div>
    <div :class="['bg-yellow-500 p-4', { 'hidden': !isMenuOpen }]">
      <nav class="bg-yellow-500 p-4">
        <RouterLink to="/" exact class="p-2 hover:bg-gray-600">Home</RouterLink>
        <RouterLink to="/schedule" exact class="p-2 hover:bg-gray-600">AI Dienstplanerstellung</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>