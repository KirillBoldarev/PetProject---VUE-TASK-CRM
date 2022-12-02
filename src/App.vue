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
    ></router-view>
  </main>

  <footer-layout
    :taskList="taskList"
    :userList="userList"
    class="main__footer"
  ></footer-layout>
</template>

<script>
import HeaderLayout from "./components/layouts/HeaderLayout.vue";
import FooterLayout from "./components/layouts/FooterLayout.vue";
import subscribtionsForUsersMutationsMixin from "./js/mixins/subscribtionsForUsersMutationsMixin";
import subscribtionsForTasksMutationsMixin from "./js/mixins/subscribtionsForTasksMutationsMixin";
import subscribtionsForCommentsMutationMixin from "./js/mixins/subscribtionsForCommentsMutationMixin";

export default {
  components: { HeaderLayout, FooterLayout },
  mixins: [
    subscribtionsForUsersMutationsMixin,
    subscribtionsForTasksMutationsMixin,
    subscribtionsForCommentsMutationMixin,
  ],
  data() {
    return {
      taskList: [],
      userList: [],
    };
  },
  methods: {},

  computed: {},

  mounted() {
    this.$store.dispatch("INITIALIZE_USER_LIST_ACTION");
    this.$store.dispatch("INITIALIZE_TASK_LIST_ACTION");
    this.$store.dispatch("UPDATE_AUTHENTICATED_ACTION");
    this.$store.dispatch("INITIALIZE_INSPECTED_TASK_ACTION");

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
