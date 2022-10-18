<template>
  <div class="container">
    <header-layout></header-layout>
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
};
</script>

<style lang="scss">
.container {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
