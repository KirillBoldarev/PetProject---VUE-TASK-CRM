<template>
  <div class="container">
    <div class="header">
      <h2 @click="info">Управление задачами</h2>
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

    <div v-for="page in pages" :key="page.name">
      <template v-if="this.currentPage === page.name">
        <div class="tasklist">
          <h3 class="tasklist__title">{{ page.label }}</h3>
          <div class="tasklist__filter">
            <label> Фильтровать по:</label>
            <select
              v-model="searchParams"
              name="searchParams"
              id="searchParams"
            >
              <option
                v-for="value in this.$options.SEARCH_PARAMS_LIST"
                :key="value"
                :value="value.name"
              >
                {{ value.label }}
              </option>
            </select>
            <input v-model="this.searchValue" type="text" />
          </div>
          <div class="tasklist__record">
            <div class="tasklist__record-item">Состояние</div>
            <div class="tasklist__record-item">Отправитель</div>
            <div class="tasklist__record-item">Исполнитель</div>
            <div class="tasklist__record-item">Описание задачи</div>
            <div class="tasklist__record-item">Действия</div>
          </div>
          <div
            v-for="task in this.filterSource(page.dataSource)"
            :key="task.id"
            class="tasklist__record"
          >
            <div class="tasklist__record-item">
              <complete-task-button
                :target="task"
              ></complete-task-button>
            </div>
            <div class="tasklist__record-item">
              {{ task.senderFullName }}
            </div>
            <div class="tasklist__record-item">
              {{ task.executorFullName }}
            </div>
            <div class="tasklist__record-item">{{ task.description }}</div>
            <div class="tasklist__record-item">
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
                ></delete-task-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import AddTaskButton from "@/components/AddTaskButton.vue";
import DeleteTaskButton from "@/components/DeleteTaskButton.vue";
import CompleteTaskButton from "@/components/CompleteTaskButton.vue";
import EditTaskButton from "@/components/EditTaskButton.vue";
import Tabs from "@/components/Tabs.vue";

export default {
  name: "TaskList",

  components: {
    AddTaskButton,
    DeleteTaskButton,
    CompleteTaskButton,
    EditTaskButton,
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
      currentPage: "personal",
      searchValue: "",
      searchParams: "description",
    };
  },
  computed: {
    pages() {
      return [
        {
          name: "personal",
          label: "Полученные задачи",
          dataSource: this.personalTasks,
        },
        { name: "charged", label: "Поручения", dataSource: this.chargedTasks },
        {
          name: "completedPersonal",
          label: "Выполненные задачи",
          dataSource: this.completedPersonalTasks,
        },
        {
          name: "completedCharged",
          label: "Исполненные поручения",
          dataSource: this.completedChargedTasks,
        },
      ];
    },
    personalTasks() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) =>
            task.executorId === this.$store.getters.authenticatedUser.id &&
            task.isCompleted === false
        );
      }
    },
    chargedTasks() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) =>
            task.senderId === this.$store.getters.authenticatedUser.id &&
            task.isCompleted === false
        );
      }
    },
    completedPersonalTasks() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) =>
            task.executorId === this.$store.getters.authenticatedUser.id &&
            task.isCompleted === true
        );
      }
    },
    completedChargedTasks() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) =>
            task.senderId === this.$store.getters.authenticatedUser.id &&
            task.isCompleted === true
        );
      }
    },
  },

  SEARCH_PARAMS_LIST: [
    { name: "senderFullName", label: "Отправитель" },
    { name: "executorFullName", label: "Исполнитель" },
    { name: "description", label: "Описание" },
  ],

  methods: {
    filterSource(source) {
      if (!this.searchParams) {
        return source;
      }
      return source.filter((item) =>
        item[this.searchParams]
          .toUpperCase()
          .includes(this.searchValue.toUpperCase())
      );
    },

    changePage(tabName) {
      this.currentPage = tabName;
      this.searchValue = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.tasklist {
  display: flex;
  flex-direction: column;
  gap: 30px;

  &__title {
    text-align: center;
    margin: 10px 0px;
    padding: 0;
  }

  &__filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
  }

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

.navigation {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
