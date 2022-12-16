<template>
  <header class="header">
    <div class="header__logo">
      <img
        class="header__logo--icon"
        src="@/assets/icons/modalBackground.png"
        alt=""
      />
    </div>
    <div class="flex-column center">
      <strong v-if="!authenticatedStore.IS_AUTHENTICATED" class="header__title">
        Приветствую! Прошу пройти авторизацию!
      </strong>
      <div
        v-if="authenticatedStore.IS_AUTHENTICATED"
        class="header__navigation"
      >
        <router-link
          v-for="link in headerLinks"
          :key="link.name"
          class="header__link"
          :to="link.url"
        >
          <mq-responsive target="tablet-">
            <img
              v-tooltip.bottom="link.name"
              class="icon--max"
              :src="getImgUrl(link.icon)"
            />
          </mq-responsive>
          <mq-responsive target="laptop+"
            ><span>{{ link.name }}</span></mq-responsive
          >
        </router-link>
      </div>
    </div>

    <div v-if="authenticatedStore.IS_AUTHENTICATED" class="flex-column center">
      <mq-responsive target="phone">
        <img
          class="icon--max"
          src="@/assets/icons/menu.png"
          alt=""
          @click="openMenu"
        />
        <dropdown-menu
          id="overlay_menu"
          ref="menu"
          :model="authMenuItems"
          :popup="true"
        />
      </mq-responsive>

      <button class="button mobileOnly" @click="$router.push('/profile')">
        Личный кабинет
      </button>
      <logout-action ref="logout" />
    </div>

    <div v-if="!authenticatedStore.IS_AUTHENTICATED" class="flex-column center">
      <mq-responsive target="phone">
        <img
          class="icon--max"
          src="@/assets/icons/menu.png"
          alt=""
          @click="openMenu"
        />
        <dropdown-menu
          id="overlay_menu"
          ref="menu"
          :model="guestMenuItems"
          :popup="true"
        />
      </mq-responsive>

      <button-with-modal-form ref="signIn" class="mobileOnly" label="Войти">
        <template #formSlot="{ closeModal }">
          <login-form @close="closeModal" />
        </template>
      </button-with-modal-form>

      <button-with-modal-form
        ref="signUp"
        class="mobileOnly"
        label="Зарегистрироваться"
      >
        <template #formSlot="{ closeModal }">
          <regisitration-form @close="closeModal" />
        </template>
      </button-with-modal-form>
    </div>
  </header>
</template>

<script setup>
import DropdownMenu from 'primevue/menu';
import LogoutAction from '@/components/actions/LogoutAction.vue';
import ButtonWithModalForm from '@/components/tools/ButtonWithModalForm.vue';
import RegisitrationForm from '@/components/forms/RegistrationForm.vue';
import LoginForm from '@/components/forms/LoginForm.vue';
import { MqResponsive } from 'vue3-mq';
import { ref } from 'vue';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { useRouter } from 'vue-router';

const authenticatedStore = useAuthenticatedStore();
const menu = ref(null);
const signIn = ref(null);
const signUp = ref(null);
const logout = ref(null);

const router = useRouter();
defineExpose({
  menu,
  signIn,
  signUp,
  logout,
});

const headerLinks = [
  { name: 'Главная', url: '/', icon: 'home.png' },
  {
    name: 'Управление задачами',
    url: '/tasks',
    icon: 'task.png',
  },
  {
    name: 'Список пользователей',
    url: '/users',
    icon: 'user.png',
  },
];

const authMenuItems = [
  {
    label: 'Личный кабинет',
    icon: 'pi pi-search',
    command: () => {
      router.push('/profile');
    },
  },
  {
    label: 'Выйти из системы',
    icon: 'pi pi-sign-out',
    command: () => {
      logout.value.confirmation();
    },
  },
];

const guestMenuItems = [
  {
    label: 'Войти',
    icon: 'pi pi-sign-in',
    command: () => {
      signIn.value.openModal();
    },
  },
  {
    label: 'Зарегистрироваться',
    icon: 'pi pi-book',
    command: () => {
      signUp.value.openModal();
    },
  },
];

function getImgUrl(item) {
  return require(`@/assets/icons/${item}`);
}

function openMenu(event) {
  menu.value.toggle(event);
}
</script>
