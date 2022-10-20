<template>
  <div class="container">
    <header-layout></header-layout>
    <button @click="test">test</button>
    <button @click="testtwo">test two</button>
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
      console.log("store.userlist :", this.$store.state.userList.userList);
    },
    testtwo() {
      console.log(
        "isAuthenticated :",
        this.$store.state.authenticate.isAuthenticated
      );
      console.log(
        "authenticatedUser :",
        this.$store.state.authenticate.authenticatedUser
      );
    },
  },

  created() {
    this.$store.commit("updateAuthUser");
    this.$store.commit("updateUserList");
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
