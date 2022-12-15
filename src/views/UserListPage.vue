<template>
  <div class="page">
    <div class="page__body">
      <h2 class="page__title">Управление пользователями</h2>
      <div class="table">
        <div class="table__row table__row--userlist">
          <div class="table__column">Имя</div>
          <div class="table__column">Роль</div>
          <div class="table__column">Электронная почта</div>
          <div class="table__column">Телефон</div>
          <div class="table__column">Действия</div>
        </div>
        <transition-group name="slide-fade">
          <div
            v-for="user in usersStore.USER_LIST"
            :key="user.id"
            class="table__row table__row--userlist"
          >
            <div v-if="user.fullName" class="table__column">
              {{ user.fullName }}
            </div>
            <div v-else class="table__column">
              {{ user.login }}
            </div>
            <div class="table__column">
              <img
                v-if="user.role === 'Неавторизованный пользователь'"
                class="icon--mini"
                src="@/assets/icons/unauthorized.png"
              />
              <img
                v-if="user.role === 'Пользователь'"
                class="icon--mini"
                src="@/assets/icons/user.png"
              />
              <img
                v-if="user.role === 'Администратор'"
                class="icon--mini"
                src="@/assets/icons/admin.png"
              />
            </div>
            <div class="table__column">
              {{ user.email }}
            </div>
            <div class="table__column">
              {{ user.phone }}
            </div>

            <div class="table__column">
              <button-with-modal-form
                :tooltip="'Назначить задачу'"
                :image="require('@/assets/icons/plus.png')"
                :icon-class="'icon--mini'"
              >
                <template #formSlot="{ closeModal }">
                  <create-task-form :target="user" @close="closeModal" />
                </template>
              </button-with-modal-form>

              <button-with-modal-form
                v-if="authenticatedStore.AUTHENTICATED.role === 'Администратор'"
                :tooltip="'Редактировать'"
                :image="require('@/assets/icons/edit.png')"
                :icon-class="'icon--mini'"
              >
                <template #formSlot="{ closeModal }">
                  <edit-user-form :target="user" @close="closeModal" />
                </template>
              </button-with-modal-form>
              <delete-user-action
                v-if="authenticatedStore.AUTHENTICATED.role === 'Администратор'"
                :target="user"
                :icon-class="'icon--mini'"
              />
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import DeleteUserAction from '@/components/actions/DeleteUserAction.vue';
import ButtonWithModalForm from '@/components/tools/ButtonWithModalForm.vue';
import CreateTaskForm from '@/components/forms/CreateTaskForm.vue';
import EditUserForm from '@/components/forms/EditUserForm.vue';
import { useUsersStore } from '@/stores/UsersStore';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';

const usersStore = useUsersStore();
const authenticatedStore = useAuthenticatedStore();
</script>
