<template>
  <div class="container">
    <header-layout></header-layout>
    <!-- <button @click="test">test</button>
    <button @click="testtwo">test two</button> -->
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
  methods: {},

  created() {
    this.$store.commit("updateAuthUser");
    this.$store.commit("updateUserList");
    this.$store.commit("updateTaskList");
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 5px;
}
</style>
