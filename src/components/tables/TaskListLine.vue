<template>
  <div class="table__column">
    <complete-task-action :target="task"></complete-task-action>
  </div>
  <div v-if="currentPage !== 'charged'" class="table__column">
    <span>{{ getPerson(task.sender) }}</span>
  </div>

  <div v-if="currentPage !== 'personal'" class="table__column">
    <span>{{ getPerson(task.executor) }}</span>
  </div>

  <div class="table__column">
    <router-link
      @click="inspectTask"
      :to="{ name: 'InspectedTask', params: { id: task.id } }"
      >{{ task.title }}</router-link
    >
  </div>
  <div class="table__column">
    <button-with-modal-form
      :image="require('@/icons/comment.png')"
      :tooltip="'Комментировать'"
      :iconClass="'icon--mini'"
    >
      <template #formSlot="{ closeModal }">
        <create-comment-form
          @close="closeModal"
          :target="task"
        ></create-comment-form>
      </template>
    </button-with-modal-form>

    <button-with-modal-form
      v-if="
        task.isCompleted === false &&
        (task.sender === this.$store.getters.GET_AUTH.id ||
          this.$store.getters.GET_AUTH.role === 'Администратор')
      "
      :image="require('@/icons/edit.png')"
      :iconClass="'icon--mini'"
      :tooltip="'Редактировать'"
    >
      <template #formSlot="{ closeModal }">
        <edit-task-form
          @close="closeModal"
          :taskList="taskList"
          :userList="userList"
          :target="task"
        ></edit-task-form>
      </template>
    </button-with-modal-form>

    <delete-task-action
      :target="task"
      :iconClass="'icon--mini'"
    ></delete-task-action>
  </div>
</template>

<script>
import ButtonWithModalForm from "@/components/ButtonWithModalForm.vue";
import EditTaskForm from "@/components/forms/EditTaskForm.vue";
import CreateCommentForm from "@/components/forms/CreateCommentForm.vue";
import DeleteTaskAction from "@/components/actions/DeleteTaskAction.vue";
import CompleteTaskAction from "@/components/actions/CompleteTaskAction.vue";

export default {
  components: {
    ButtonWithModalForm,
    EditTaskForm,
    CreateCommentForm,
    DeleteTaskAction,
    CompleteTaskAction,
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

  methods: {
    inspectTask() {
      this.$store.commit("INSPECT_TASK", this.task);
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

  computed: {},
};
</script>
