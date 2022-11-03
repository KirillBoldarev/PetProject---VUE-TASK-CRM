<template>
  <div class="page">
    <div class="page__header">
      <h2 class="page__title">Управление пользователями</h2>
    </div>
    <div class="table">
      <div class="table__row table__row--6">
        <div class="table__column">Имя</div>
        <div class="table__column">Роль</div>
        <div class="table__column">Электронная почта</div>
        <div class="table__column">Телефон</div>
        <div class="table__column">Активные задачи</div>
        <div class="table__column">Действия</div>
      </div>
      <transition-group name="slide-fade">
        <div
          v-for="user in this.userList"
          :key="user.id"
          class="table__row table__row--6"
        >
          <div class="table__column">
            {{ user.firstName }} {{ user.secondName }}
          </div>
          <div class="table__column">
            <img
              v-if="user.role === 'Неавторизованный пользователь'"
              class="icon"
              src="@/icons/unauthorized.png"
              alt=""
            />
            <img
              v-if="user.role === 'Пользователь'"
              class="icon"
              src="@/icons/user.png"
              alt=""
            />
            <img
              v-if="user.role === 'Администратор'"
              class="icon"
              src="@/icons/admin.png"
              alt=""
            />
          </div>
          <div class="table__column">{{ user.email }}</div>
          <div class="table__column">{{ user.phone }}</div>
          <div class="table__column">
            {{ this.getActiveTasksNumber(user) }}
          </div>
          <div class="table__column">
            <add-task-action
              :taskList="taskList"
              :userList="userList"
              :target="user"
            ></add-task-action>
            <edit-user-action
              :taskList="taskList"
              :userList="userList"
              :target="user"
            ></edit-user-action>
            <delete-user-action :target="user"></delete-user-action>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import AddTaskAction from "@/components/actions/AddTaskAction.vue";
import DeleteUserAction from "@/components/actions/DeleteUserAction.vue";
import EditUserAction from "@/components/actions/EditUserAction.vue";
export default {
  components: { Modal, AddTaskAction, DeleteUserAction, EditUserAction },

  props: {
    taskList: {
      type: Array,
      required: true,
    },
    userList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {};
  },

  created() {},

  computed: {},

  methods: {
    getActiveTasksNumber(user) {
      let filteredTasks = this.taskList;
      return filteredTasks.filter(
        (task) => task.executorId === user.id && task.isCompleted === false
      ).length;
    },
  },
  watch: {},
};
</script>

