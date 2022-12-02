<template>
  <template v-for="page in permittedPages" :key="page.name">
    <div class="page" v-if="currentPage === page.name">
      <div class="page__body">
        <h2 class="page__title">Управление задачами</h2>
        <div class="flex-column center">
          <tabs
            :tabs="permittedPages"
            :selectedTab="currentPage"
            @changeTab="changePage"
          ></tabs>
          <div class="form">
            <div class="form__toolbar">
              <div class="flex-row center">
                <label class="form__label"> Отображать завершенные:</label>
                <img v-if="includeCompletedTask"
                  @click="includeCompletedTask = false"
                  class="icon"
                  src="@/icons/check.png"
                />
                <img v-if="!includeCompletedTask"
                  @click="includeCompletedTask = true"
                  class="icon"
                  src="@/icons/notСheck.png"
                />
              </div>
              <div class="flex-row center">
                <label class="form__label"> Поиск:</label>
                <input class="form__input" v-model="searchValue" type="text" />
              </div>
              <div class="flex-row center">
                <label class="form__label"> Добавить задачу:</label>
                <button-with-modal-form
                  :tooltip="'Добавить задачу'"
                  :image="require('@/icons/plus.png')"
                  :iconClass="'icon'"
                >
                  <template v-slot:formSlot="{ closeModal }">
                    <create-task-form
                      @close="closeModal"
                      :taskList="taskList"
                      :userList="userList"
                      :target="this.$store.getters.GET_AUTH"
                    ></create-task-form>
                  </template>
                </button-with-modal-form>
              </div>
            </div>
          </div>
        </div>
        <div class="table">
          <div class="table__row" :class="getGrid">
            <div class="table__column">Состояние</div>
            <div v-if="currentPage !== 'charged'" class="table__column">
              Отправитель
            </div>
            <div v-if="currentPage !== 'personal'" class="table__column">
              Исполнитель
            </div>
            <div class="table__column">Описание задачи</div>
            <div class="table__column">Действия</div>
          </div>

          <transition-group name="slide-fade">
            <div
              class="table__row"
              :class="getGrid"
              v-for="task in filterSource(page.dataSource)"
              :key="task.id"
            >
              <task-list-line
                :taskList="taskList"
                :userList="userList"
                :task="task"
                :currentPage="currentPage"
              ></task-list-line>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import ButtonWithModalForm from "@/components/ButtonWithModalForm.vue";
import CreateTaskForm from "@/components/forms/CreateTaskForm.vue";
import TaskListLine from "@/components/tables/TaskListLine.vue";

export default {
  name: "TaskList",

  components: {
    Tabs,
    ButtonWithModalForm,
    CreateTaskForm,
    TaskListLine,
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
      includeCompletedTask: true,
    };
  },
  computed: {
    permittedPages() {
      if (this.$store.getters.GET_AUTH.role === "Администратор") {
        return this.pages;
      } else {
        return this.pages.filter((page) => page.name !== "all");
      }
    },
    getGrid() {
      if (this.currentPage === "personal") {
        return "table__row--4";
      }
      if (this.currentPage === "charged") {
        return "table__row--4";
      }
      if (this.currentPage === "all") {
        return "table__row--5";
      }
    },
    pages() {
      return [
        {
          name: "personal",
          label: "Полученные",
          dataSource: this.personalTasks,
        },
        {
          name: "charged",
          label: "Отправленные",
          dataSource: this.chargedTasks,
        },
        {
          name: "all",
          label: "Все задачи",
          dataSource: this.taskList,
        },
      ];
    },

    chargedTasks() {
      if (!this.taskList) {
        return [];
      } else {
        let currentUserId = this.$store.getters.GET_AUTH.id;
        return this.taskList.filter((task) => task.sender === currentUserId);
      }
    },

    personalTasks() {
      if (!this.taskList) {
        return [];
      } else {
        let currentUserId = this.$store.getters.GET_AUTH.id;
        return this.taskList.filter((task) => task.executor === currentUserId);
      }
    },
  },

  methods: {
    info() {},
    //НЕ НРАВИТСЯ! ПЕРЕДЕЛАТЬ!
    filterSource(source) {
      if (!this.searchValue && this.includeCompletedTask === true) {
        return source;
      }
      if (!this.searchValue && this.includeCompletedTask === false) {
        return source.filter((item) => item.isCompleted === false);
      }
      if (this.searchValue && this.includeCompletedTask === true) {
        return source.filter((item) =>
          item.title.toUpperCase().includes(this.searchValue.toUpperCase())
        );
      }
      if (this.searchValue && this.includeCompletedTask === false) {
        return source.filter(
          (item) =>
            item.title.toUpperCase().includes(this.searchValue.toUpperCase()) &&
            item.isCompleted === false
        );
      }
    },

    changePage(tabName) {
      this.currentPage = tabName;
      this.searchValue = "";
    },
  },

  beforeCreate() {},
};
</script>
