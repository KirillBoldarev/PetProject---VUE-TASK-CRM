<template>
  <div class="table__column">
    <complete-task-action :target="task" />
  </div>
  <div v-if="currentPage !== 'charged'" class="table__column">
    <span>{{ getPersonById(task.sender) }}</span>
  </div>

  <div v-if="currentPage !== 'personal'" class="table__column">
    <span>{{ getPersonById(task.executor) }}</span>
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
        (task.sender === authenticatedStore.AUTH.id ||
          authenticatedStore.AUTH.role === 'Администратор')
      "
      :image="require('@/assets/icons/edit.png')"
      :icon-class="'icon--mini'"
      :tooltip="'Редактировать'"
    >
      <template #formSlot="{ closeModal }">
        <edit-task-form :target="props.task" @close="closeModal" />
      </template>
    </button-with-modal-form>

    <delete-task-action :target="task" :icon-class="'icon--mini'" />
  </div>
</template>

<script setup>
import ButtonWithModalForm from '@/components/tools/ButtonWithModalForm.vue';
import EditTaskForm from '@/components/forms/EditTaskForm.vue';
import CreateCommentForm from '@/components/forms/CreateCommentForm.vue';
import DeleteTaskAction from '@/components/actions/DeleteTaskAction.vue';
import CompleteTaskAction from '@/components/actions/CompleteTaskAction.vue';

import { useInspectedTaskStore } from '@/stores/InspectedTaskStore.js';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore.js';
import { useCommentsStore } from '@/stores/CommentsStore';

import { getPersonById } from '@/js/composables/getPersonById';

const authenticatedStore = useAuthenticatedStore();
const commentsStore = useCommentsStore();
const inspectedTaskStore = useInspectedTaskStore();

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  currentPage: {
    type: String,
    required: true,
  },
});

function inspectTask() {
  inspectedTaskStore.INSPECT_TASK(props.task);
  commentsStore.INITIALIZE_COMMENTS(props.task.id);
}
</script>
