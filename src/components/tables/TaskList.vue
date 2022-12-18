<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <div class="page">
    <h2 class="page__title">Управление задачами</h2>
    <tabs-panel
      class="page__toolbar"
      :tabs="permittedPages"
      :selected-tab="currentPage"
      @changeTab="changePage"
    />
    <template v-for="page in permittedPages" :key="page.name">
      <div v-if="currentPage === page.name" class="page__body">
        <div class="flex-column center">
          <div class="form">
            <div class="form__toolbar">
              <div class="flex-row center">
                <mq-responsive target="tablet+"
                  ><label class="form__label">
                    Отображать завершенные:</label
                  ></mq-responsive
                >
                <img
                  v-if="includeCompletedTask"
                  class="icon"
                  src="@/assets/icons/check.png"
                  @click="includeCompletedTask = false"
                />
                <img
                  v-if="!includeCompletedTask"
                  class="icon"
                  src="@/assets/icons/notСheck.png"
                  @click="includeCompletedTask = true"
                />
              </div>
              <div class="flex-row center">
                <label class="form__label"> Фильтр:</label>
                <input v-model="searchValue" class="form__input" type="text" />
              </div>
              <div class="flex-row center">
                <mq-responsive target="tablet+"
                  ><label class="form__label">
                    Добавить задачу:</label
                  ></mq-responsive
                >
                <button-with-modal-form
                  :tooltip="'Добавить задачу'"
                  :image="require('@/assets/icons/plus.png')"
                  :icon-class="'icon'"
                >
                  <template #formSlot="{ closeModal }">
                    <create-task-form
                      :target="authenticatedStore.AUTH"
                      @close="closeModal"
                    />
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
              v-for="task in filterSource(page.dataSource)"
              :key="task.id"
              class="table__row"
              :class="getGrid()"
            >
              <task-list-line :task="task" :current-page="currentPage" />
            </div>
          </transition-group>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import TabsPanel from '@/components/tools/TabsPanel.vue';
import ButtonWithModalForm from '@/components/tools/ButtonWithModalForm.vue';
import CreateTaskForm from '@/components/forms/CreateTaskForm.vue';
import TaskListLine from '@/components/tables/TaskListLine.vue';
import { MqResponsive } from 'vue3-mq';
import { ref, computed } from 'vue';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { useTasksStore } from '@/stores/TasksStore';

const authenticatedStore = useAuthenticatedStore();

const tasksStore = useTasksStore();

const currentPage = ref('personal');
const searchValue = ref('');
const includeCompletedTask = ref(false);

const pages = computed(() => {
  return [
    {
      name: 'personal',
      label: 'Полученные',
      dataSource: personalTasks.value,
    },
    {
      name: 'charged',
      label: 'Отправленные',
      dataSource: chargedTasks.value,
    },
    {
      name: 'all',
      label: 'Все задачи',
      dataSource: tasksStore.TASK_LIST,
    },
  ];
});

const permittedPages = computed(() => {
  if (authenticatedStore.AUTH.role === 'Администратор') {
    return pages.value;
  }
  return pages.value.filter((page) => page.name !== 'all');
});

const chargedTasks = computed(() => {
  if (!tasksStore.TASK_LIST) {
    return [];
  }
  return tasksStore.TASK_LIST.filter(
    (task) => task.sender === authenticatedStore.AUTH.id
  );
});
const personalTasks = computed(() => {
  if (!tasksStore.TASK_LIST) {
    return [];
  }
  return tasksStore.TASK_LIST.filter(
    (task) => task.executor === authenticatedStore.AUTH.id
  );
});

function getGrid() {
  if (currentPage.value === 'personal') {
    return 'table__row--personal-charged';
  }
  if (currentPage.value === 'charged') {
    return 'table__row--personal-charged';
  }
  if (currentPage.value === 'all') {
    return 'table__row--alltask';
  }
}

// НЕ НРАВИТСЯ! ПЕРЕДЕЛАТЬ!
function filterSource(source) {
  if (!searchValue.value && includeCompletedTask.value === true) {
    return source;
  }
  if (!searchValue.value && includeCompletedTask.value === false) {
    return source.filter((item) => item.isCompleted === false);
  }
  if (searchValue.value && includeCompletedTask.value === true) {
    return source.filter((item) =>
      item.title.toUpperCase().includes(searchValue.value.toUpperCase())
    );
  }
  if (searchValue.value && includeCompletedTask.value === false) {
    return source.filter(
      (item) =>
        item.title.toUpperCase().includes(searchValue.value.toUpperCase()) &&
        item.isCompleted === false
    );
  }
}

function changePage(tabName) {
  currentPage.value = tabName;
  searchValue.value = '';
}
</script>
