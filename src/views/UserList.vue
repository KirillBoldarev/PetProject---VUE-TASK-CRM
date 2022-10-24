<template>
  <div class="container">
    <h2>Управление пользователями</h2>
    <div class="userlist">
      <div class="userlist__header">
        <div class="userlist__header-item">Имя</div>
        <div class="userlist__header-item">Роль</div>
        <div class="userlist__header-item">Электронная почта</div>
        <div class="userlist__header-item">Телефон</div>
        <div class="userlist__header-item">Активные задачи</div>
        <div class="userlist__header-item">Действия</div>
      </div>
      <div v-for="user in users" :key="user.id" class="userlist__record">
        <div class="userlist__record-item">
          {{ user.firstName }} {{ user.secondName }}
        </div>
        <div class="userlist__record-item">{{ user.role }}</div>
        <div class="userlist__record-item">{{ user.email }}</div>
        <div class="userlist__record-item">{{ user.phone }}</div>
        <div class="userlist__record-item">{{ this.getActiveTasks(user) }}</div>
        <div class="userlist__record-item">
          <add-task-button
            :taskList="taskList"
            :userList="userList"
            :target="user"
          ></add-task-button>
          <img class="icon" src="@/icons/edit.png" alt="" />
          <img
            @click="this.deleteCurrentUser(user)"
            class="icon"
            src="@/icons/trash.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import AddTaskButton from "@/components/AddTaskButton.vue";
export default {
  components: { Modal, AddTaskButton },

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
    return {
      users: [],
    };
  },

  created() {
    this.users = JSON.parse(localStorage.getItem("userList"));
  },

  computed: {
    userList() {
      return this.$store.getters.getUserList;
    },

    taskList() {
      return this.$store.getters.getTaskList;
    },
  },

  methods: {
    deleteCurrentUser(user) {
      this.users = this.users.filter((users) => users.id !== user.id);
      localStorage.setItem("userList", JSON.stringify(this.users));
      this.$store.commit("updateUserList");
    },

    getActiveTasks(user) {
      let filteredTasks = this.taskList;
      return filteredTasks.filter(
        (task) => task.executor === user.id && task.isCompleted === false
      ).length;
    },
  },
  watch: {
    userList() {
      this.users = JSON.parse(localStorage.getItem("userList"));
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
}
.userlist {
  display: flex;
  flex-direction: column;
  gap: 30px;

  &__header {
    display: grid;
    grid-template-columns: 1fr 45px 1fr 1fr 1fr 155px;
    gap: 10px;
    justify-content: center;
    align-items: center;
    height: auto;
  }

  &__header-item {
    border: 1px solid red;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5px;
    min-height: 100%;
    gap: 10px;

    &:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    &:last-child {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }

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
    }
  }
}

.icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin: 5px 5px;
}

h2 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
</style>
