<template>
  <div class="page" v-if="inspectedTask">
    <div class="page__body">
      <div class="flex-row center">
        <complete-task-action
          :target="inspectedTask"
        ></complete-task-action>
        <img
          @click="this.editTaskMode = !this.editTaskMode"
          v-tooltip.bottom="'Редактировать'"
          class="icon"
          src="@/icons/edit.png"
          alt=""
        />
        <delete-task-action :target="inspectedTask"></delete-task-action>
      </div>
      <h2 class="page__title">Задача:{{ title }}</h2>
      <div class="flex-column center">
        <strong>Дата создания: {{ dateOfCreation }}</strong>
        <strong v-if="isCompleted"
          >Дата завершения: {{ this.inspectedTask.dateOfCompletion }}</strong
        >
      </div>
      <edit-task-form
        v-if="this.editTaskMode"
        :taskList="taskList"
        :userList="userList"
        :target="inspectedTask"
      ></edit-task-form>
    </div>
  </div>
</template>

<script>
import EditTaskForm from "@/components/forms/EditTaskForm.vue";
import CompleteTaskAction from "@/components/actions/CompleteTaskAction.vue";
import DeleteTaskAction from "@/components/actions/DeleteTaskAction.vue";

export default {
  components: {
    EditTaskForm,
    CompleteTaskAction,
    DeleteTaskAction,
  },

  data() {
    return {
      executor: this.userList.find(
        (user) =>
          user.id ===
          this.$store.getters.TASK_EXECUTORS.find(
            (record) => record.task === this.inspectedTask.id
          ).executor
      ),
      sender: this.userList.find(
        (user) =>
          user.id ===
          this.$store.getters.TASK_SENDERS.find(
            (record) => record.task === this.inspectedTask.id
          ).sender
      ),
      description: this.inspectedTask.description,
      title: this.inspectedTask.title,
      isCompleted: this.inspectedTask.isCompleted,
      id: this.inspectedTask.id,
      commits: this.inspectedTask.commits,
      dateOfCreation: this.inspectedTask.dateOfCreation,
      dateOfCompletion: this.inspectedTask.dateOfCompletion,

      editTaskMode: false,
    };
  },

  validatios() {
    return {
      description: { required },
      title: { required },
    };
  },
  mounted() {},

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
      required: false,
    },
  },
  watch: {},
};
</script>
