<template>
  <img
    @click="deleteTask"
    class="icon"
    src="@/icons/trash.png"
    alt=""
  />
</template>

<script>
export default {
  name: "DeleteTaskButton",
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
    deleteTask() {
      this.$store.commit("deleteTask", this.target);
    },
  },

  computed: {},
};
</script>
