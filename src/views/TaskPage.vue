<template>
  <div class="page" v-if="inspectedTask">
    <div class="page__body">
      <div>{{ this.$store.getters.GET_COMMENTS }}</div>
      <div class="page__toolbar flex-row center w-auto">
        <complete-task-action :target="inspectedTask"></complete-task-action>
        <button-with-modal-form
          :image="require('@/icons/comment.png')"
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
          @click="this.editTaskMode = !this.editTaskMode"
          v-tooltip.bottom="'Редактировать'"
          class="icon"
          src="@/icons/edit.png"
          alt=""
        />
        <delete-task-action :target="inspectedTask"></delete-task-action>
        <img
          @click="this.$router.push('/tasks')"
          v-tooltip.bottom="'Назад'"
          class="icon"
          src="@/icons/back.png"
          alt=""
        />
      </div>
      <h2 class="page__title">Задача:{{ this.inspectedTask.title }}</h2>
      <div class="flex-row center">
        <strong
          >Отправитель:
          <span v-if="this.sender.firstName && this.sender.secondName"
            >{{ this.sender.firstName }} {{ this.sender.secondName }}</span
          ><span v-else> {{ this.sender.login }}</span></strong
        >
        <strong
          >Исполнитель:
          <span v-if="this.executor.firstName && this.executor.secondName"
            >{{ this.executor.firstName }} {{ this.executor.secondName }}</span
          ><span v-else> {{ this.executor.login }}</span></strong
        >
      </div>
      <div class="flex-row center">
        <strong>Дата создания: {{ inspectedTask.dateOfCreation }}</strong>
        <strong v-if="this.inspectedTask.isCompleted"
          >Дата завершения: {{ this.inspectedTask.dateOfCompletion }}</strong
        >
      </div>
      <edit-task-form
        @edited="this.editTaskMode = !this.editTaskMode"
        v-if="this.editTaskMode"
        :taskList="taskList"
        :userList="userList"
        :target="inspectedTask"
      ></edit-task-form>
      <div v-if="!editTaskMode" class="flex-column center">
        <h3 class="page__title">Описание задачи:</h3>
        <div class="page__text">{{ inspectedTask.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import EditTaskForm from "@/components/forms/EditTaskForm.vue";
import CompleteTaskAction from "@/components/actions/CompleteTaskAction.vue";
import DeleteTaskAction from "@/components/actions/DeleteTaskAction.vue";
import CreateCommentForm from "@/components/forms/CreateCommentForm.vue";
import ButtonWithModalForm from "@/components/ButtonWithModalForm.vue";

export default {
  components: {
    EditTaskForm,
    CompleteTaskAction,
    DeleteTaskAction,
    CreateCommentForm,
    ButtonWithModalForm,
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
    inspectedTask: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sender: this.userList.find(
        (user) =>
          user.id ===
          this.$store.getters.TASK_RELATIONS.find(
            (record) => record.task === this.inspectedTask.id
          ).sender
      ),
      executor: this.userList.find(
        (user) =>
          user.id ===
          this.$store.getters.TASK_RELATIONS.find(
            (record) => record.task === this.inspectedTask.id
          ).executor
      ),
      editTaskMode: false,
    };
  },
  beforeCreate() {
    this.$store.dispatch("INITIALIZE_COMMENTS_ACTION", this.inspectedTask.id);
  },
  methods: {},
};
</script>
