<template>
  <div class="container">
    <h2>Управление пользователями</h2>
    <div class="userlist">
      <div class="userlist__record">
        <div class="userlist__record-item">Имя</div>
        <div class="userlist__record-item">Роль</div>
        <div class="userlist__record-item">Электронная почта</div>
        <div class="userlist__record-item">Телефон</div>
        <div class="userlist__record-item">Активные задачи</div>
        <div class="userlist__record-item">Действия</div>
      </div>
      <div
        v-for="user in this.userList"
        :key="user.id"
        class="userlist__record"
      >
        <div class="userlist__record-item">
          {{ user.firstName }} {{ user.secondName }}
        </div>
        <div class="userlist__record-item">
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
        <div class="userlist__record-item">{{ user.email }}</div>
        <div class="userlist__record-item">{{ user.phone }}</div>
        <div class="userlist__record-item">
          {{ this.getActiveTasks(user) }}
        </div>
        <div class="userlist__record-item">
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
          <delete-user-button
            :target="user"
            :userList="userList"
          ></delete-user-button>
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
    getActiveTasks(user) {
      let filteredTasks = this.taskList;
      return filteredTasks.filter(
        (task) => task.executor === user.id && task.isCompleted === false
      ).length;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
/* .container {
} */
.userlist {
  display: flex;
  flex-direction: column;
  gap: 30px;

  &__record {
    display: grid;
    grid-template-columns: 1fr 45px 1fr 1fr 1fr 155px;
    gap: 5px;
    justify-content: center;
    align-items: center;
    height: auto;
  }

  &__record-item {
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5px;
    min-height: 100%;

    &:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    &:last-child {
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }
  }
}

.icon {
  font-size: 34px;
  color: #fff;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  text-decoration: none;
  cursor: pointer;
}
</style>
