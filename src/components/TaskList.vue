<template>
  <template v-for="page in permittedPages" :key="page.name">
    <div class="flex-column center" v-if="this.currentPage === page.name">
      <div @click="info">RELATIONS {{ this.relations }}</div>
      <h2 class="page__title">Управление задачами</h2>
      <div class="flex-column center">
        <tabs
          :tabs="permittedPages"
          :selectedTab="currentPage"
          @changeTab="changePage"
        ></tabs>
        <div class="form">
          <label class="form__label"> Отображать завершенные:</label>
          <input
            v-model="completed"
            type="checkbox"
            name="completedTask"
            id="completedCheckbox"
          />
          <label class="form__label"> Поиск:</label>
          <input class="form__input" v-model="this.searchValue" type="text" />
          <label class="form__label"> Добавить задачу:</label>
          <button-with-modal-form
            :tooltip="'Добавить задачу'"
            :image="require('@/icons/plus.png')"
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
            v-for="task in this.filterSource(page.dataSource)"
            :key="task.id"
          >
            <div class="table__column">
              <complete-task-action :target="task"></complete-task-action>
            </div>
            <div v-if="currentPage !== 'charged'" class="table__column">
              <span
                v-if="
                  this.getSender(task).firstName &&
                  this.getSender(task).secondName
                "
                >{{ this.getSender(task).firstName }}
                {{ this.getSender(task).secondName }}</span
              >
              <span v-else>{{ this.getSender(task).login }}</span>
            </div>

            <div v-if="currentPage !== 'personal'" class="table__column">
              <span
                v-if="
                  this.getExecutor(task).firstName &&
                  this.getExecutor(task).secondName
                "
                >{{ this.getExecutor(task).firstName }}
                {{ this.getExecutor(task).secondName }}</span
              >
              <span v-else>{{ this.getExecutor(task).login }}</span>
            </div>
            <div class="table__column">
              <router-link
                @click="this.inspectTask(task)"
                :to="{ name: 'InspectedTask', params: { id: task.id } }"
                >{{ task.title }}</router-link
              >
            </div>
            <div class="table__column">
              <button-with-modal-form
                :image="require('@/icons/comment.png')"
                :tooltip="'Комментировать'"
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
                  this.getSender(task).id === this.$store.getters.GET_AUTH.id
                "
                :image="require('@/icons/edit.png')"
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

              <delete-task-action :target="task"></delete-task-action>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </template>
</template>

<script>
import DeleteTaskAction from "@/components/actions/DeleteTaskAction.vue";
import CompleteTaskAction from "@/components/actions/CompleteTaskAction.vue";
import Tabs from "@/components/Tabs.vue";
import ButtonWithModalForm from "@/components/ButtonWithModalForm.vue";
import CreateTaskForm from "@/components/forms/CreateTaskForm.vue";
import EditTaskForm from "@/components/forms/EditTaskForm.vue";
import CreateCommentForm from "./forms/CreateCommentForm.vue";

export default {
  name: "TaskList",

  components: {
    CreateCommentForm,
    DeleteTaskAction,
    CompleteTaskAction,
    Tabs,
    ButtonWithModalForm,
    CreateTaskForm,
    EditTaskForm,
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
      completed: true,
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
        return this.taskList.filter(task => task.executor === currentUserId)
      }
    },
  },

  methods: {
    info() {
    },

    inspectTask(task) {
      this.$store.commit("INSPECT_TASK", task);
    },
    getSender(task) {
      return this.userList.find((user) => user.id === task.sender);
    },

    getExecutor(task) {
      return this.userList.find(user => user.id === task.executor);
    },

    //НЕ НРАВИТСЯ! ПЕРЕДЕЛАТЬ!
    filterSource(source) {
      if (!this.searchValue && this.completed === true) {
        return source;
      }
      if (!this.searchValue && this.completed === false) {
        return source.filter((item) => item.isCompleted === this.completed);
      }
      if (this.searchValue && this.completed === true) {
        return source.filter((item) =>
          item.title.toUpperCase().includes(this.searchValue.toUpperCase())
        );
      }
      if (this.searchValue && this.completed === false) {
        return source.filter(
          (item) =>
            item.title.toUpperCase().includes(this.searchValue.toUpperCase()) &&
            item.isCompleted === this.completed
        );
      }
    },

    changePage(tabName) {
      this.currentPage = tabName;
      this.searchValue = "";
    },
  },

  beforeCreate() {
  },
};
</script>
