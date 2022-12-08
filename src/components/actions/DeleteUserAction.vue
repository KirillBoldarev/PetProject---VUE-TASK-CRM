<template>
  <img
    v-tooltip.bottom="'Удалить пользователя'"
    :class="iconClass"
    src="@/assets/icons/trash.png"
    alt=""
    @click="confirmation"
  >
  <confirm-dialog
    :is-dialog-open="isDialogOpen"
    @confirm="deleteUserHandler"
    @close="isDialogOpen = false"
  />
</template>

<script>
import { mapStores } from 'pinia';
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue';
import confirmationDialogMixin from '@/js/mixins/confirmationDialogMixin';
import { useUsersStore } from '@/stores/UsersStore';

export default {
  name: 'DeleteUserButton',
  components: { ConfirmDialog },
  mixins: [confirmationDialogMixin],

  props: {
    target: {
      type: Object,
      required: true
    },
    iconClass: {
      type: String,
      required: false
    }
  },

  data() {
    return {};
  },

  methods: {
    deleteUserHandler() {
      this.usersStore.DELETE_USER(this.target);
    }
  },

  computed: {
    ...mapStores(useUsersStore)
  }
};
</script>
