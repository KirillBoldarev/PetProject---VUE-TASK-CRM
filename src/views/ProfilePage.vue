<template>
  <div class="page">
    <div class="page__body">
      <h2 class="page__title">
        Профиль пользователя : {{ authenticated.login }}
        <span v-if="authenticated.firstName && authenticated.secondName">
          - {{ authenticated.firstName }} {{ authenticated.secondName }}</span
        >
      </h2>
      <div class="page__toolbar flex-row center">
        <img
          @click="switchEditUserMode"
          v-tooltip.bottom="'Редактировать профиль'"
          class="icon"
          src="@/assets/icons/edit.png"
          alt=""
        />
        <img
          @click="switchShowTaskMode"
          v-tooltip.bottom="'Показать/скрыть задачи'"
          class="icon"
          src="@/assets/icons/task.png"
          alt=""
        />
      </div>

      <edit-user-form
        v-if="editUserMode"
        @edited="editUserMode = false"
        :target="authenticatedStore.GET_AUTH"
        :userList="userList"
        :taskList="taskList"
      ></edit-user-form>
      <task-list
        v-if="showTaskMode"
        :taskList="taskList"
        :userList="userList"
      ></task-list>
    </div>
  </div>
</template>

<script>

import EditUserForm from '@/components/forms/EditUserForm.vue'
import TaskList from '@/components/tables/TaskList.vue'

import { useAuthenticatedStore } from '@/stores/AuthenticatedStore'
import { mapStores } from 'pinia'
export default {
  data () {
    return {
      editUserMode: false,
      showTaskMode: true,
      authenticated: null
    }
  },

  components: {

    EditUserForm,
    TaskList
  },

  props: {
    taskList: {
      type: Array,
      required: true
    },
    userList: {
      type: Array,
      required: true
    }
  },

  beforeMount () {
    this.authenticated = this.authenticatedStore.GET_AUTH
  },

  methods: {
    switchEditUserMode () {
      this.editUserMode = !this.editUserMode
      this.showTaskMode = false
    },
    switchShowTaskMode () {
      this.showTaskMode = !this.showTaskMode
      this.editUserMode = false
    }
  },

  computed: {
    ...mapStores(useAuthenticatedStore)
  }
}
</script>
