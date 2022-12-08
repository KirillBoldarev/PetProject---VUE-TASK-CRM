<template>
  <header-layout class="main__header" />
  <main class="main__content">
    <router-view />
  </main>
  <footer-layout class="main__footer" />
</template>

<script>
import HeaderLayout from './HeaderLayout.vue';
import FooterLayout from './FooterLayout.vue';

export default {
  components: { HeaderLayout, FooterLayout },
  data() {
    return {};
  },
  computed: {},
};
</script>
