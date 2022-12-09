<template>
  <div class="table__column">
    <complete-task-action :target="task" />
  </div>
  <div v-if="currentPage !== 'charged'" class="table__column">
    <span>{{ getPerson(task.sender) }}</span>
  </div>

  <div v-if="currentPage !== 'personal'" class="table__column">
    <span>{{ getPerson(task.executor) }}</span>
  </div>

  <div class="table__column">
    <router-link
      :to="{ name: 'InspectedTask', params: { id: task.id } }"
      @click="inspectTask"
    >
      {{ task.title }}
    </router-link>
  </div>
  <div class="table__column">
    <button-with-modal-form
      :image="require('@/assets/icons/comment.png')"
      :tooltip="'Комментировать'"
      :icon-class="'icon--mini'"
    >
      <template #formSlot="{ closeModal }">
        <create-comment-form :target="task" @close="closeModal" />
      </template>
    </button-with-modal-form>

    <button-with-modal-form
      v-if="
        task.isCompleted === false &&
        (task.sender === authenticatedStore.GET_AUTH.id ||
          authenticatedStore.GET_AUTH.role === 'Администратор')
      "
      :image="require('@/assets/icons/edit.png')"
      :icon-class="'icon--mini'"
      :tooltip="'Редактировать'"
    >
      <template #formSlot="{ closeModal }">
        <edit-task-form :target="task" @close="closeModal" />
      </template>
    </button-with-modal-form>

    <delete-task-action :target="task" :icon-class="'icon--mini'" />
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import ButtonWithModalForm from '@/components/tools/ButtonWithModalForm.vue';
import EditTaskForm from '@/components/forms/EditTaskForm.vue';
import CreateCommentForm from '@/components/forms/CreateCommentForm.vue';
import DeleteTaskAction from '@/components/actions/DeleteTaskAction.vue';
import CompleteTaskAction from '@/components/actions/CompleteTaskAction.vue';

import { useInspectedTaskStore } from '@/stores/InspectedTaskStore.js';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore.js';
import { useUsersStore } from '@/stores/UsersStore';

export default {
  components: {
    ButtonWithModalForm,
    EditTaskForm,
    CreateCommentForm,
    DeleteTaskAction,
    CompleteTaskAction,
  },

  props: {
    task: {
      type: Object,
      required: true,
    },
    currentPage: {
      type: String,
      required: true,
    },
  },

  data() {
    return {};
  },
  computed: {
    ...mapStores(useInspectedTaskStore, useAuthenticatedStore, useUsersStore),
  },
  methods: {
    inspectTask() {
      this.inspectedTaskStore.INSPECT_TASK(this.task);
    },

    getPerson(id) {
      const person = this.usersStore.GET_USER_LIST.find(
        (user) => user.id === id
      );
      if (!person) {
        return 'Пользователь удален';
      }
      if (!person.firstName || !person.secondName) {
        return `${person.login}`;
      }
      return `${person.firstName} ${person.secondName}`;
    },
  },
};
</script>
