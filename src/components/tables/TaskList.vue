<template>
  <div class="page">
    <h2 class="page__title">Управление задачами</h2>
    <tabs-panel
      class="page__toolbar"
      :tabs="permittedPages"
      :selectedTab="currentPage"
      @changeTab="changePage"
    ></tabs-panel>
    <template v-for="page in permittedPages" :key="page.name">
      <div class="page__body" v-if="currentPage === page.name">
        <div class="flex-column center">
          <div class="form">
            <div class="form__toolbar">
              <div class="flex-row center">
                <label
                  v-if="this.screenResolutionStore.IS_DESKTOP"
                  class="form__label"
                >
                  Отображать завершенные:</label
                >
                <img
                  v-if="includeCompletedTask"
                  @click="includeCompletedTask = false"
                  class="icon"
                  src="@/assets/icons/check.png"
                />
                <img
                  v-if="!includeCompletedTask"
                  @click="includeCompletedTask = true"
                  class="icon"
                  src="@/assets/icons/notСheck.png"
                />
              </div>
              <div class="flex-row center">
                <label class="form__label"> Поиск:</label>
                <input class="form__input" v-model="searchValue" type="text" />
              </div>
              <div class="flex-row center">
                <label
                  v-if="screenResolutionStore.IS_DESKTOP"
                  class="form__label"
                >
                  Добавить задачу:</label
                >
                <button-with-modal-form
                  :tooltip="'Добавить задачу'"
                  :image="require('@/assets/icons/plus.png')"
                  :iconClass="'icon'"
                >
                  <template v-slot:formSlot="{ closeModal }">
                    <create-task-form
                      @close="closeModal"
                      :taskList="taskList"
                      :userList="userList"
                      :target="authenticatedStore.GET_AUTH"
                    ></create-task-form>
                  </template>
                </button-with-modal-form>
              </div>
            </div>
          </div>
        </div>
        <div class="table">
          <div class="table__row" :class="getGrid()">
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
              :class="getGrid()"
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
    </template>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import TabsPanel from "@/components/tools/TabsPanel.vue";
import ButtonWithModalForm from "@/components/tools/ButtonWithModalForm.vue";
import CreateTaskForm from "@/components/forms/CreateTaskForm.vue";
import TaskListLine from "@/components/tables/TaskListLine.vue";

import { useAuthenticatedStore } from "@/stores/AuthenticatedStore";
import { useScreenResolutionStore } from "@/stores/ScreenResolution";

export default {
  name: "TaskList",
  components: {
    TabsPanel,
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
    ...mapStores(useAuthenticatedStore, useScreenResolutionStore),
    permittedPages() {
      if (this.authenticatedStore.GET_AUTH.role === "Администратор") {
        return this.pages;
      }
      return this.pages.filter((page) => page.name !== "all");
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
      }
      const currentUserId = this.authenticatedStore.GET_AUTH.id;
      return this.taskList.filter((task) => task.sender === currentUserId);
    },

    personalTasks() {
      if (!this.taskList) {
        return [];
      }
      const currentUserId = this.authenticatedStore.GET_AUTH.id;
      return this.taskList.filter((task) => task.executor === currentUserId);
    },
  },

  methods: {
    getGrid() {
      if (this.currentPage === "personal") {
        return "table__row--personal-charged";
      }
      if (this.currentPage === "charged") {
        return "table__row--personal-charged";
      }
      if (this.currentPage === "all") {
        return "table__row--alltask";
      }
    },
    // НЕ НРАВИТСЯ! ПЕРЕДЕЛАТЬ!
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
