<template>
  <header-layout
    class="main__header"
    :taskList="taskList"
    :userList="userList"
  ></header-layout>
  <main class="main__content">
    <router-view
      :taskList="taskList"
      :userList="userList"
      :inspectedTask="inspectedTask"
    ></router-view>
  </main>

  <footer-layout
    :taskList="taskList"
    :userList="userList"
    class="main__footer"
  ></footer-layout>
</template>

<script>
import HeaderLayout from "./layouts/HeaderLayout.vue";
import FooterLayout from "./layouts/FooterLayout.vue";

import usersMutations from "./js/mixins/subscribtionsForUsersMutationsMixin";
import tasksMutations from "./js/mixins/subscribtionsForTasksMutationsMixin";

export default {
  components: { HeaderLayout, FooterLayout },
  mixins: [usersMutations, tasksMutations],
  data() {
    return {
      taskList: [],
      userList: [],
      inspectedTask: {},
    };
  },
  methods: {},

  computed: {},

  mounted() {
    this.$store.dispatch("initialize_TASK_SENDERS_ACTION");
    this.$store.dispatch("initialize_TASK_EXECUTORS_ACTION");
    this.$store.dispatch("updateAuthenticatedAction");

    // fetch("http://admin-tasks.local/api/users/11", {
    //   method: "put",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },

    //   //make sure to serialize your JSON body
    //   body: JSON.stringify({
    //     firstName: "ololo",
    //     secondName: "rtololol",
    //     email: "welrhw@glswkngs.rtu",
    //     phone: 12312312,
    //   }),
    // }).then((response) => {
    //   console.log(response);
    // });
    
/*     fetch("http://admin-tasks.local/api/users/11", {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: "ololo",
        secondName: "rtololol",
        email: "welrhw@glswkngs.rtu",
        phone: 12312312,
      }),
    }).then((response) => {
      console.log(response);
    }); */
  },
};
</script>
