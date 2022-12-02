<template>
  <img
    v-tooltip.bottom="'Удалить пользователя'"
    @click="confirmation"
    :class=iconClass
    src="@/icons/trash.png"
    alt=""
  />
  <confirm-dialog
    :isDialogOpen="isDialogOpen"
    @confirm="deleteUser"
    @close="isDialogOpen = false"
  ></confirm-dialog>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import confirmationDialogMixin from "@/js/mixins/confirmationDialogMixin";
import localbase from "@/js/localbase";

export default {
  name: "DeleteUserButton",
  components: { ConfirmDialog },
  mixins: [confirmationDialogMixin],

  props: {
    target: {
      type: Object,
      required: true,
    },
    iconClass: {
      type: String,
      required: false,
    },
  },

  data() {
    return {};
  },

  methods: {
    deleteUser() {
      this.$store.commit("DELETE_USER", this.target);
      localbase.collection("users").doc({ id: this.target.id }).delete();
    },
  },

  computed: {},
};
</script>
