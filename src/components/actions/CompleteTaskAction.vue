<template>
  <img
    v-if="target.isCompleted === true"
    @click="confirmation"
    class="icon"
    src="@/icons/check.png"
    alt=""
  />

  <img
    v-if="target.isCompleted === false"
    @click="confirmation"
    class="icon"
    src="@/icons/notСheck.png"
    alt=""
  />

  <confirm-dialog
    :isDialogOpen="isDialogOpen"
    @confirm="completeTask"
    @close="isDialogOpen = false"
  ></confirm-dialog>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import localbase from "@/js/localbase";

export default {
  name: "CompleteTaskButton",
  components: { ConfirmDialog },

  props: {
    target: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isDialogOpen: false,
    };
  },

  methods: {
    completeTask() {
      localbase.collection("tasks").doc({ id: this.target.id }).update({
        isCompleted: !this.target.isCompleted,
      });
      this.$store.commit("completeTask", this.target);
    },
    confirmation() {
      this.isDialogOpen = true;
    },
  },

  computed: {},
};
</script>
