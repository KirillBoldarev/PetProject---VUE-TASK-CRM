<template>
  <div class="page" v-if="this.inspectedTask && this.userList.length > 0">
    <div class="page__body">
      <div class="page__toolbar flex-row center w-auto">
        <complete-task-action
          :target="this.inspectedTask"
        ></complete-task-action>
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
        <delete-task-action :target="this.inspectedTask"></delete-task-action>
        <img
          @click="lastPath"
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
        <strong>Дата создания: {{ this.inspectedTask.dateOfCreation }}</strong>
        <strong v-if="this.inspectedTask.isCompleted"
          >Дата завершения: {{ this.inspectedTask.dateOfCompletion }}</strong
        >
        <strong v-if="this.inspectedTask.isCompleted"
          >Затраченное время: {{ this.spendedTime }}</strong
        >
      </div>
      <edit-task-form
        @edited="this.editTaskMode = !this.editTaskMode"
        v-if="this.editTaskMode"
        :taskList="taskList"
        :userList="userList"
        :target="this.inspectedTask"
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
          <comment :target="comment"></comment>
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
import Comment from "@/components/Comment.vue";

export default {
  components: {
    EditTaskForm,
    CompleteTaskAction,
    DeleteTaskAction,
    CreateCommentForm,
    ButtonWithModalForm,
    Comment,
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
      editTaskMode: false,
    };
  },

  methods: {
    lastPath() {
      let lastPathRoute = this.$router.options.history.state.back;
      return this.$router.push(lastPathRoute);
    },
  },
  computed: {
    spendedTime() {
      let spendedTime = this.dateOfCompletion - this.dateOfCreation
    return  spendedTime
    },
    sender() {
      return this.userList.find(
        (user) => user.id === this.inspectedTask.sender
      );
    },
    executor() {
      return this.userList.find(
        (user) => user.id === this.inspectedTask.executor
      );
    },
  },
  /*   watch: {
    $route(to, from) {
      let id = this.$route.params.id;
      let changedTask = this.taskList.find((task) => task.id === id);
      if (changedTask) {
        this.$store.commit("INSPECT_TASK", changedTask);
      } else {
        this.$router.push("/");
      }
    },
  }, */
  beforeCreate() {
    if (this.$store.getters.GET_COMMENTS.length < 1) {
      this.$store.dispatch("INITIALIZE_COMMENTS_ACTION", this.inspectedTask.id);
    }
  },
  unmounted() {
    this.$store.commit("CLEAR_COMMENTS");
  },
};
</script>
