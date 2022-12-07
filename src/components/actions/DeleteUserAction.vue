<template>
  <img
    v-tooltip.bottom="'Удалить пользователя'"
    @click="confirmation"
    :class="iconClass"
    src="@/assets/icons/trash.png"
    alt=""
  />
  <confirm-dialog
    :isDialogOpen="isDialogOpen"
    @confirm="deleteUserHandler"
    @close="isDialogOpen = false"
  ></confirm-dialog>
</template>

<script>
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue'
import confirmationDialogMixin from '@/js/mixins/confirmationDialogMixin'
import { mapStores } from 'pinia'
import { useUsersStore } from '@/stores/UsersStore'

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

  data () {
    return {}
  },

  methods: {
    deleteUserHandler () {
      this.usersStore.DELETE_USER(this.target)
    }
  },

  computed: {
    ...mapStores(useUsersStore)
  }
}
</script>
