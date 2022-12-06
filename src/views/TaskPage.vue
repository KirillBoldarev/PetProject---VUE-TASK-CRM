<template>
  <div class="page" v-if="inspectedTask && userList.length > 0">
    <div class="page__body">
      <div class="page__toolbar flex-row center w-auto">
        <complete-task-action :target="inspectedTask"></complete-task-action>
        <button-with-modal-form
          :image="require('@/icons/comment.png')"
          :iconClass="'icon'"
          :tooltip="'Комментировать'"
        >
          <template #formSlot="{ closeModal }">
            <create-comment-form
              @close="closeModal"
              :target="inspectedTask"
            ></create-comment-form>
          </template>
        </button-with-modal-form>
        <img
          @click="editTaskMode = !editTaskMode"
          v-tooltip.bottom="'Редактировать'"
          class="icon"
          src="@/icons/edit.png"
          alt=""
        />
        <delete-task-action
          :target="inspectedTask"
          :iconClass="'icon'"
        ></delete-task-action>
        <img
          @click="lastPath"
          v-tooltip.bottom="'Назад'"
          class="icon"
          src="@/icons/back.png"
          alt=""
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
        @edited="editTaskMode = !editTaskMode"
        v-if="editTaskMode"
        :taskList="taskList"
        :userList="userList"
        :target="inspectedTask"
      ></edit-task-form>
      <div v-if="!editTaskMode" class="flex-column center">
        <h3 class="page__title">Описание задачи:</h3>
        <div class="page__text">{{ inspectedTask.description }}</div>
      </div>

      <transition-group name="slide-fade">
        <div
          v-for="comment in this.$store.getters.GET_COMMENTS"
          :key="comment.id"
        >
          <comment :target="comment" :userList="userList"></comment>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import EditTaskForm from "@/components/forms/EditTaskForm.vue";
import CompleteTaskAction from "@/components/actions/CompleteTaskAction.vue";
import DeleteTaskAction from "@/components/actions/DeleteTaskAction.vue";
import CreateCommentForm from "@/components/forms/CreateCommentForm.vue";
import ButtonWithModalForm from "@/components/ButtonWithModalForm.vue";
import Comment from "@/components/tables/CommentLine.vue";
import filterDate from "@/js/libs/filterDate";
import subscribtionsForCommentsMutationMixin from "@/js/mixins/subscribtionsForCommentsMutationMixin";

import { useCommentsStore } from "@/store/CommentsStore";
import { useInspectedTaskStore } from "@/store/InspectedTaskStore";
import { mapStores } from "pinia";

export default {
  components: {
    EditTaskForm,
    CompleteTaskAction,
    DeleteTaskAction,
    CreateCommentForm,
    ButtonWithModalForm,
    Comment,
  },
  mixins: [subscribtionsForCommentsMutationMixin],
  props: {
    userList: {
      type: Array,
      required: true,
    },
    inspectedTask: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editTaskMode: false,
    };
  },

  methods: {
    lastPath() {
      let lastPathRoute = this.$router.options.history.state.back;
      return this.$router.push(lastPathRoute);
    },

    getPerson(role) {
      let person = this.userList.find((user) => user.id === role);
      if (!person) {
        return "Пользователь удален";
      }
      if (!person.firstName || !person.secondName) {
        return `${person.login}`;
      }
      return `${person.firstName} ${person.secondName}`;
    },
  },
  computed: {
    ...mapStores(useInspectedTaskStore, useCommentsStore),
    filteredDateOfCreation() {
      return filterDate(this.inspectedTask.dateOfCreation, "datetime");
    },
    filteredDateOfCompletion() {
      return filterDate(this.inspectedTask.dateOfCompletion, "datetime");
    },
    spendedTime() {
      //из разницы вычитаем часовой пояс - костыль библиотеки
      let spendedTime =
        this.inspectedTask.dateOfCompletion -
        this.inspectedTask.dateOfCreation -
        3 * 60 * 60 * 1000;
      return filterDate(spendedTime, "time");
    },
  },
  beforeMount() {
    this.$store.dispatch("INITIALIZE_COMMENTS_ACTION", this.inspectedTask.id);
    this.commentsStore.INITIALIZE_COMMENTS(this.inspectedTask.id);
  },
  unmounted() {
    this.$store.commit("CLEAR_COMMENTS");
    this.inspectedTaskStore.CLEAR_INSPECTED_TASK();
    this.commentsStore.CLEAR_COMMENTS();
  },
};
</script>
