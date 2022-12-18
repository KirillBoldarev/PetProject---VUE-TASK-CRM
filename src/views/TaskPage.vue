<template>
  <div v-if="INSPECTED_TASK" class="page">
    <div class="page__body">
      <div class="page__toolbar flex-row center w-auto">
        <complete-task-action :target="INSPECTED_TASK" />
        <button-with-modal-form
          :image="require('@/assets/icons/comment.png')"
          :icon-class="'icon'"
          :tooltip="'Комментировать'"
        >
          <template #formSlot="{ closeModal }">
            <create-comment-form :target="INSPECTED_TASK" @close="closeModal" />
          </template>
        </button-with-modal-form>
        <button class="button--none" @click="editTaskMode = !editTaskMode">
          <img
            v-tooltip.bottom="'Редактировать'"
            class="icon"
            src="@/assets/icons/edit.png"
            alt=""
          />
        </button>
        <delete-task-action :target="INSPECTED_TASK" :icon-class="'icon'" />
        <button class="button--none" @click="sendToLastPath">
          <img
            v-tooltip.bottom="'Назад'"
            class="icon"
            src="@/assets/icons/back.png"
            alt=""
          />
        </button>
      </div>
      <h2 class="page__title">Задача:{{ INSPECTED_TASK.title }}</h2>
      <div class="flex-row center">
        <strong
          >Отправитель:
          <span>{{ getPersonById(INSPECTED_TASK.sender) }}</span>
        </strong>
        <strong
          >Исполнитель:
          <span>{{ getPersonById(INSPECTED_TASK.executor) }}</span>
        </strong>
      </div>
      <div class="flex-row center">
        <strong
          >Дата создания:
          {{ filterDate(INSPECTED_TASK.dateOfCreation, 'datetime') }}</strong
        >
        <strong v-if="INSPECTED_TASK.isCompleted"
          >Дата завершения:
          {{ filterDate(INSPECTED_TASK.dateOfCompletion, 'datetime') }}</strong
        >
        <strong v-if="INSPECTED_TASK.isCompleted"
          >Затраченное время: {{ spendedTime }}</strong
        >
      </div>
      <edit-task-form
        v-if="editTaskMode"
        :target="INSPECTED_TASK"
        @edited="editTaskMode = !editTaskMode"
      />
      <div v-if="!editTaskMode" class="flex-column center">
        <h3 class="page__title">Описание задачи:</h3>
        <div class="page__text">
          {{ INSPECTED_TASK.description }}
        </div>
      </div>

      <transition-group name="slide-fade">
        <template v-if="!editTaskMode">
          <div v-for="comment in commentsStore.COMMENTS" :key="comment.id">
            <comment :target="comment" />
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import EditTaskForm from '@/components/forms/EditTaskForm.vue';
import CompleteTaskAction from '@/components/actions/CompleteTaskAction.vue';
import DeleteTaskAction from '@/components/actions/DeleteTaskAction.vue';
import CreateCommentForm from '@/components/forms/CreateCommentForm.vue';
import ButtonWithModalForm from '@/components/tools/ButtonWithModalForm.vue';
import Comment from '@/components/tables/CommentLine.vue';

import { ref, computed, onUnmounted } from 'vue';

import { useCommentsStore } from '@/stores/CommentsStore';
import { useInspectedTaskStore } from '@/stores/InspectedTaskStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import filterDate from '@/js/composables/filterDate';
import { getPersonById } from '@/js/composables/getPersonById';

const inspectedTaskStore = useInspectedTaskStore();
const { INSPECTED_TASK } = storeToRefs(inspectedTaskStore);
const commentsStore = useCommentsStore();

const router = useRouter();

const editTaskMode = ref(false);

const spendedTime = computed(() => {
  const spendedTime =
    this.inspectedTask.dateOfCompletion -
    this.inspectedTask.dateOfCreation -
    3 * 60 * 60 * 1000;
  return filterDate(spendedTime, 'time');
});

onUnmounted(() => {
  inspectedTaskStore.CLEAR_INSPECTED_TASK();
  commentsStore.CLEAR_COMMENTS();
});

function sendToLastPath() {
  const lastPathRoute = router.options.history.state.back;
  return router.push(lastPathRoute);
}

onUnmounted(() => {
  inspectedTaskStore.CLEAR_INSPECTED_TASK();
  commentsStore.CLEAR_COMMENTS();
});
</script>
