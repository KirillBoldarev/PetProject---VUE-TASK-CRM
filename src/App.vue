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
      this.$store.commit("info");
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
    restoreAuthUser() {
      let id = sessionStorage.getItem("authenticatedUserId");
      if (id) {
        let userList = JSON.parse(localStorage.getItem("userList"));
        this.$store.commit(
          "authenticateCurrentUser",
          userList.find((user) => user.id === id)
        );
      }
    },
  },

  created() {
    this.restoreAuthUser();
  },
};
</script>

<style lang="scss">
.container {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
