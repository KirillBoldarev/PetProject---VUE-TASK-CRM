<template>
  <div class="page">
    <div class="page__body">
      <h2 class="page__title">
        Профиль пользователя : {{ authenticatedStore.GET_AUTH.login }}
        <span
          v-if="
            authenticatedStore.GET_AUTH.firstName &&
            authenticatedStore.GET_AUTH.secondName
          "
        >
          - {{ authenticatedStore.GET_AUTH.firstName }}
          {{ authenticatedStore.GET_AUTH.secondName }}</span
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
        @edited="editUserMode = false"
      />
      <task-list v-if="showTaskMode" />
    </div>
  </div>
</template>

<script>
import EditUserForm from '@/components/forms/EditUserForm.vue';
import TaskList from '@/components/tables/TaskList.vue';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { mapStores } from 'pinia';
import { useUsersStore } from '@/stores/UsersStore';
import { useTasksStore } from '@/stores/TasksStore';

export default {
  components: {
    EditUserForm,
    TaskList,
  },

  props: {},
  data() {
    return {
      editUserMode: false,
      showTaskMode: true,
      authenticated: null,
    };
  },
  computed: {
    ...mapStores(useAuthenticatedStore, useUsersStore, useTasksStore),
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
};
</script>
