<template>
  <header-layout class="main__header" />
  <main class="main__content">
    <router-view />
  </main>
  <footer-layout class="main__footer" />
</template>

<script setup>
import HeaderLayout from './HeaderLayout.vue';
import FooterLayout from './FooterLayout.vue';
</script>
