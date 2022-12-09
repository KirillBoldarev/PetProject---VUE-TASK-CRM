<template>
  <div v-if="inspectedTask" class="page">
    <div class="page__body">
      <div class="page__toolbar flex-row center w-auto">
        <complete-task-action :target="inspectedTask" />
        <button-with-modal-form
          :image="require('@/assets/icons/comment.png')"
          :icon-class="'icon'"
          :tooltip="'Комментировать'"
        >
          <template #formSlot="{ closeModal }">
            <create-comment-form :target="inspectedTask" @close="closeModal" />
          </template>
        </button-with-modal-form>
        <img
          v-tooltip.bottom="'Редактировать'"
          class="icon"
          src="@/assets/icons/edit.png"
          alt=""
          @click="editTaskMode = !editTaskMode"
        />
        <delete-task-action :target="inspectedTask" :icon-class="'icon'" />
        <img
          v-tooltip.bottom="'Назад'"
          class="icon"
          src="@/assets/icons/back.png"
          alt=""
          @click="lastPath"
        />
      </div>
      <h2 class="page__title">Задача:{{ inspectedTask.title }}</h2>
      <div class="flex-row center">
        <strong
          >Отправитель:
          <span>{{ getPerson(inspectedTask.sender) }}</span>
        </strong>
        <strong
          >Исполнитель:
          <span>{{ getPerson(inspectedTask.executor) }}</span>
        </strong>
      </div>
      <div class="flex-row center">
        <strong>Дата создания: {{ filteredDateOfCreation }}</strong>
        <strong v-if="inspectedTask.isCompleted"
          >Дата завершения: {{ filteredDateOfCompletion }}</strong
        >
        <strong v-if="inspectedTask.isCompleted"
          >Затраченное время: {{ spendedTime }}</strong
        >
      </div>
      <edit-task-form
        v-if="editTaskMode"
        :target="inspectedTask"
        @edited="editTaskMode = !editTaskMode"
      />
      <div v-if="!editTaskMode" class="flex-column center">
        <h3 class="page__title">Описание задачи:</h3>
        <div class="page__text">
          {{ inspectedTask.description }}
        </div>
      </div>

      <transition-group name="slide-fade">
        <template v-if="!editTaskMode">
          <div v-for="comment in commentsStore.GET_COMMENTS" :key="comment.id">
            <comment :target="comment" />
          </div>
        </template>
      </transition-group>
    </div>
  </div>
</template>

<script>
import EditTaskForm from '@/components/forms/EditTaskForm.vue';
import CompleteTaskAction from '@/components/actions/CompleteTaskAction.vue';
import DeleteTaskAction from '@/components/actions/DeleteTaskAction.vue';
import CreateCommentForm from '@/components/forms/CreateCommentForm.vue';
import ButtonWithModalForm from '@/components/tools/ButtonWithModalForm.vue';
import Comment from '@/components/tables/CommentLine.vue';
import filterDate from '@/js/libs/filterDate';

import { useCommentsStore } from '@/stores/CommentsStore';
import { useInspectedTaskStore } from '@/stores/InspectedTaskStore';
import { useUsersStore } from '@/stores/UsersStore';
import { mapStores } from 'pinia';

export default {
  components: {
    EditTaskForm,
    CompleteTaskAction,
    DeleteTaskAction,
    CreateCommentForm,
    ButtonWithModalForm,
    Comment,
  },
  mixins: [],
  props: {},
  data() {
    return {
      editTaskMode: false,
    };
  },
  computed: {
    ...mapStores(useInspectedTaskStore, useCommentsStore, useUsersStore),
    inspectedTask() {
      return this.inspectedTaskStore.GET_INSPECTED_TASK;
    },
    filteredDateOfCreation() {
      return filterDate(
        this.inspectedTaskStore.GET_INSPECTED_TASK.dateOfCreation,
        'datetime'
      );
    },
    filteredDateOfCompletion() {
      return filterDate(
        this.inspectedTaskStore.GET_INSPECTED_TASK.dateOfCompletion,
        'datetime'
      );
    },
    spendedTime() {
      // из разницы вычитаем часовой пояс - костыль библиотеки
      const spendedTime =
        this.inspectedTask.dateOfCompletion -
        this.inspectedTask.dateOfCreation -
        3 * 60 * 60 * 1000;
      return filterDate(spendedTime, 'time');
    },
  },

  beforeMount() {},
  unmounted() {
    this.inspectedTaskStore.CLEAR_INSPECTED_TASK();
    this.commentsStore.CLEAR_COMMENTS();
  },
  methods: {
    lastPath() {
      const lastPathRoute = this.$router.options.history.state.back;
      return this.$router.push(lastPathRoute);
    },

    getPerson(role) {
      const person = this.usersStore.GET_USER_LIST.find(
        (user) => user.id === role
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
