<template>
  <button
  v-show="screenResolutionStore.IS_DESKTOP"
  @click="confirmation" class="button">Выйти из системы</button>
  <confirm-dialog
    :isDialogOpen="isDialogOpen"
    @confirm="logoutHandler"
    @close="isDialogOpen = false"
  ></confirm-dialog>
</template>

<script>
import ConfirmDialog from '@/components/tools/ConfirmDialog.vue'
import confirmationDialogMixin from '@/js/mixins/confirmationDialogMixin'
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore'
import { useScreenResolutionStore } from '@/stores/ScreenResolution'

import { mapStores } from 'pinia'
export default {
  components: { ConfirmDialog },
  mixins: [confirmationDialogMixin],

  data () {
    return {}
  },

  methods: {
    logoutHandler () {
      this.authenticatedStore.LOGOUT()
      this.$router.push('/')
    }
  },
  computed: {
    ...mapStores(useAuthenticatedStore, useScreenResolutionStore)
  }
}
</script>
