<template>
  <img
    v-tooltip.bottom="'Удалить пользователя'"
    @click="confirmation"
    :class="iconClass"
    src="@/icons/trash.png"
    alt=""
  />
  <confirm-dialog
    :isDialogOpen="isDialogOpen"
    @confirm="deleteUserHandler"
    @close="isDialogOpen = false"
  ></confirm-dialog>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import confirmationDialogMixin from "@/js/mixins/confirmationDialogMixin";
import localbase from "@/js/libs/localbase";
import { mapStores } from "pinia";
import { useUsersStore } from "@/store/UsersStore";

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
    deleteUserHandler() {
      this.$store.commit("DELETE_USER", this.target);
      this.usersStore.DELETE_USER(this.target);
      localbase.collection("users").doc({ id: this.target.id }).delete();
    },
  },

  computed: {
    ...mapStores(useUsersStore)
  },
};
</script>
