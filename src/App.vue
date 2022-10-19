<template>
  <div class="container">
    <header-layout></header-layout>
    <button @click="test">test</button>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import HeaderLayout from "./layouts/HeaderLayout.vue";

export default {
  components: { HeaderLayout },

  data() {
    return {};
  },
  methods: {
    test() {
      this.$store.commit("info");
    },
  },
};
</script>

<style lang="scss">
.container {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
