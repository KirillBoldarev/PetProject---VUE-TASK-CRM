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
          <add-task-button
            :taskList="taskList"
            :userList="userList"
            :target="user"
          ></add-task-button>
          <edit-user-button-vue
            :taskList="taskList"
            :userList="userList"
            :target="user"
          ></edit-user-button-vue>
          <delete-user-button :target="user"></delete-user-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import AddTaskButton from "@/components/AddTaskButton.vue";
import DeleteUserButton from "@/components/DeleteUserButton.vue";
import EditUserButtonVue from "@/components/EditUserButton.vue";
export default {
  components: { Modal, AddTaskButton, DeleteUserButton, EditUserButtonVue },

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

