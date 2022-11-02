<template>
  <img @click="deleteUser" class="icon" src="@/icons/trash.png" alt="" />
</template>

<script>
export default {
  name: "DeleteUserButton",
  components: {},

  props: {
    target: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  methods: {
    deleteUser() {
      this.$store.commit("deleteUser", this.target);
    },
  },

  computed: {},
};
</script>
