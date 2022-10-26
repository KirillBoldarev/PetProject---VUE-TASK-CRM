<template>
  <div class="container">
    <div class="header">
      <h2>Управление задачами</h2>
      <add-task-button
        :taskList="taskList"
        :userList="userList"
        :target="this.$store.state.authentication.authenticatedUser"
      ></add-task-button>
    </div>
    <div class="navigation">
      <tabs
        :tabs="pages"
        :selectedTab="currentPage"
        @changeTab="changePage"
      ></tabs>
    </div>
    <div v-if="this.currentPage === 'personal'">
      <div class="tasklist">
        <h3>Полученные задачи</h3>
        <div class="tasklist__record">
          <div class="tasklist__record-item">Состояние</div>
          <div class="tasklist__record-item">Отправитель</div>
          <div class="tasklist__record-item">Исполнитель</div>
          <div class="tasklist__record-item">Описание задачи</div>
          <div class="tasklist__record-item">Действия</div>
        </div>
        <div v-for="task in personal" :key="task.id" class="tasklist__record">
          <div class="tasklist__record-item">
            <complete-task-button
              :target="task"
              :taskList="taskList"
            ></complete-task-button>
          </div>
          <div class="tasklist__record-item">
            {{ this.getSenderName(task.sender) }}
          </div>
          <div class="tasklist__record-item">
            {{ this.getExecutorName(task.executor) }}
          </div>
          <div class="tasklist__record-item">{{ task.description }}</div>
          <div class="tasklist__record-item">
            <div>
              <redirect-task-button
                :target="task"
                :userList="userList"
                :taskList="taskList"
              ></redirect-task-button>
            </div>
            <div>
              <edit-task-button
                :target="task"
                :userList="userList"
                :taskList="taskList"
              ></edit-task-button>
            </div>
            <div>
              <delete-task-button
                :target="task"
                :taskList="taskList"
              ></delete-task-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.currentPage === 'charged'">
      <div class="tasklist">
        <h3>Поручения</h3>
        <div class="tasklist__record">
          <div class="tasklist__record-item">Состояние</div>
          <div class="tasklist__record-item">Отправитель</div>
          <div class="tasklist__record-item">Исполнитель</div>
          <div class="tasklist__record-item">Описание задачи</div>
          <div class="tasklist__record-item">Действия</div>
        </div>
        <div v-for="task in charged" :key="task.id" class="tasklist__record">
          <div class="tasklist__record-item">
            <complete-task-button
              :target="task"
              :taskList="taskList"
            ></complete-task-button>
          </div>
          <div class="tasklist__record-item">
            {{ this.getSenderName(task.sender) }}
          </div>
          <div class="tasklist__record-item">
            {{ this.getExecutorName(task.executor) }}
          </div>
          <div class="tasklist__record-item">{{ task.description }}</div>
          <div class="tasklist__record-item">
            <div>
              <redirect-task-button
                :target="task"
                :userList="userList"
                :taskList="taskList"
              ></redirect-task-button>
            </div>
            <div>
              <edit-task-button
                :target="task"
                :userList="userList"
                :taskList="taskList"
              ></edit-task-button>
            </div>
            <div>
              <delete-task-button
                :target="task"
                :taskList="taskList"
              ></delete-task-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.currentPage === 'completedPersonal'">
      <div class="tasklist">
        <h3>Выполненные задачи</h3>
        <div class="tasklist__record">
          <div class="tasklist__record-item">Состояние</div>
          <div class="tasklist__record-item">Отправитель</div>
          <div class="tasklist__record-item">Исполнитель</div>
          <div class="tasklist__record-item">Описание задачи</div>
          <div class="tasklist__record-item">Действия</div>
        </div>
        <div
          v-for="task in completedPersonal"
          :key="task.id"
          class="tasklist__record"
        >
          <div class="tasklist__record-item">
            <complete-task-button
              :target="task"
              :taskList="taskList"
            ></complete-task-button>
          </div>
          <div class="tasklist__record-item">
            {{ this.getSenderName(task.sender) }}
          </div>
          <div class="tasklist__record-item">
            {{ this.getExecutorName(task.executor) }}
          </div>
          <div class="tasklist__record-item">{{ task.description }}</div>
          <div class="tasklist__record-item">
            <div>
              <redirect-task-button
                :target="task"
                :userList="userList"
                :taskList="taskList"
              ></redirect-task-button>
            </div>
            <div>
              <edit-task-button
                :target="task"
                :userList="userList"
                :taskList="taskList"
              ></edit-task-button>
            </div>
            <div>
              <delete-task-button
                :target="task"
                :taskList="taskList"
              ></delete-task-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.currentPage === 'completedCharged'">
      <div class="tasklist">
        <h3>Исполненные поручения задачи</h3>
        <div class="tasklist__record">
          <div class="tasklist__record-item">Состояние</div>
          <div class="tasklist__record-item">Отправитель</div>
          <div class="tasklist__record-item">Исполнитель</div>
          <div class="tasklist__record-item">Описание задачи</div>
          <div class="tasklist__record-item">Действия</div>
        </div>
        <div
          v-for="task in completedCharged"
          :key="task.id"
          class="tasklist__record"
        >
          <div class="tasklist__record-item">
            <complete-task-button
              :target="task"
              :taskList="taskList"
            ></complete-task-button>
          </div>
          <div class="tasklist__record-item">
            {{ this.getSenderName(task.sender) }}
          </div>
          <div class="tasklist__record-item">
            {{ this.getExecutorName(task.executor) }}
          </div>
          <div class="tasklist__record-item">{{ task.description }}</div>
          <div class="tasklist__record-item">
            <div>
              <redirect-task-button
                :target="task"
                :userList="userList"
                :taskList="taskList"
              ></redirect-task-button>
            </div>
            <div>
              <edit-task-button
                :target="task"
                :userList="userList"
                :taskList="taskList"
              ></edit-task-button>
            </div>
            <div>
              <delete-task-button
                :target="task"
                :taskList="taskList"
              ></delete-task-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddTaskButton from "@/components/AddTaskButton.vue";
import DeleteTaskButton from "@/components/DeleteTaskButton.vue";
import CompleteTaskButton from "@/components/CompleteTaskButton.vue";
import EditTaskButton from "@/components/EditTaskButton.vue";
import RedirectTaskButton from "@/components/RedirectTaskButton.vue";
import Tabs from "@/components/Tabs.vue";

export default {
  name: "TaskList",

  components: {
    AddTaskButton,
    DeleteTaskButton,
    CompleteTaskButton,
    EditTaskButton,
    RedirectTaskButton,
    Tabs,
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
  },

  data() {
    return {
      pages: [
        { name: "personal", label: "Полученные задачи" },
        { name: "charged", label: "Поручения" },
        { name: "completedPersonal", label: "Выполненные задачи" },
        { name: "completedCharged", label: "Исполненные поручения" },
      ],
      currentPage: "personal",
    };
  },

  created() {},

  methods: {
    getSenderName(senderId) {
      let sender = this.userList.find((user) => user.id === senderId);
      if (!sender) {
        return "Пользователь был удален";
      } else {
        let message = `${sender.firstName} ${sender.secondName}`;
        return message;
      }
    },
    getExecutorName(executorId) {
      let executor = this.userList.find((user) => user.id === executorId);
      if (!executor) {
        return "Пользователь был удален";
      } else {
        let message = `${executor.firstName} ${executor.secondName}`;
        return message;
      }
    },
    changePage(tabName) {
      this.currentPage = tabName;
    },
  },

  computed: {
    personal() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) =>
            task.executor === this.$store.getters.authenticatedUser.id &&
            task.isCompleted === false
        );
      }
    },
    charged() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) =>
            task.sender === this.$store.getters.authenticatedUser.id &&
            task.isCompleted === false
        );
      }
    },
    completedPersonal() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) =>
            task.executor === this.$store.getters.authenticatedUser.id &&
            task.isCompleted === true
        );
      }
    },
    completedCharged() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) =>
            task.sender === this.$store.getters.authenticatedUser.id &&
            task.isCompleted === true
        );
      }
    },
  },

  watch: {},
};
</script>

<style lang="scss" scoped>
.tasklist {
  display: flex;
  flex-direction: column;
  gap: 30px;

  &__record {
    display: grid;
    grid-template-columns: 85px 1fr 1fr 3fr 130px;
    gap: 10px;
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
    gap: 5px;

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

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.navigation{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
