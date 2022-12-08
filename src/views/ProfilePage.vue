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
          v-tooltip.bottom="'Редактировать профиль'"
          class="icon"
          src="@/assets/icons/edit.png"
          alt=""
          @click="switchEditUserMode"
        />
        <img
          v-tooltip.bottom="'Показать/скрыть задачи'"
          class="icon"
          src="@/assets/icons/task.png"
          alt=""
          @click="switchShowTaskMode"
        />
      </div>

      <edit-user-form
        v-if="editUserMode"
        :target="authenticatedStore.GET_AUTH"
        :userList="userList"
        :task-list="taskList"
        @edited="editUserMode = false"
      />
      <task-list
        v-if="showTaskMode"
        :task-list="taskList"
        :user-list="userList"
      />
    </div>
  </div>
</template>

<script>
import EditUserForm from '@/components/forms/EditUserForm.vue';
import TaskList from '@/components/tables/TaskList.vue';

import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { mapStores } from 'pinia';
export default {
  components: {
    EditUserForm,
    TaskList,
  },

  props: {
    taskList: {
      type: Array,
      required: true,
    },
    userList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      editUserMode: false,
      showTaskMode: true,
      authenticated: null,
    };
  },

  beforeMount() {
    this.authenticated = this.authenticatedStore.GET_AUTH;
  },

  methods: {
    switchEditUserMode() {
      this.editUserMode = !this.editUserMode;
      this.showTaskMode = false;
    },
    switchShowTaskMode() {
      this.showTaskMode = !this.showTaskMode;
      this.editUserMode = false;
    },
  },

  computed: {
    ...mapStores(useAuthenticatedStore),
  },
};
</script>
