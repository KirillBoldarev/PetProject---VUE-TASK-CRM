<template>
  <img
    v-if="target.isCompleted === true"
    @click="completeTask"
    class="icon"
    src="@/icons/check.png"
    alt=""
  />
  <img
    v-if="target.isCompleted === false"
    @click="completeTask"
    class="icon"
    src="@/icons/notСheck.png"
    alt=""
  />
</template>

<script>
export default {
  name: "CompleteTaskButton",
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
    completeTask() {
      this.$store.commit("completeTask", this.target);
    },
  },

  computed: {},
};
</script>
