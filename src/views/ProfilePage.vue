<template>
  <div class="page">
    <div class="page__body">
      <h2 class="page__title">
        Профиль пользователя : {{ authenticatedStore.AUTH.login }}
        <span v-if="authenticatedStore.AUTH.fullName">
          - {{ authenticatedStore.AUTH.fullName }}</span
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
        :target="authenticatedStore.AUTH"
        @edited="editUserMode = false"
      />
      <task-list v-if="showTaskMode" />
    </div>
  </div>
</template>

<script setup>
import EditUserForm from '@/components/forms/EditUserForm.vue';
import TaskList from '@/components/tables/TaskList.vue';

import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';

import { ref } from 'vue';

const authenticatedStore = useAuthenticatedStore();

const editUserMode = ref(false);
const showTaskMode = ref(true);

function switchEditUserMode() {
  editUserMode.value = !editUserMode.value;
  showTaskMode.value = false;
}
function switchShowTaskMode() {
  showTaskMode.value = !showTaskMode.value;
  editUserMode.value = false;
}
</script>
