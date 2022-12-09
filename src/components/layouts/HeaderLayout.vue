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
      <strong v-if="!authenticatedStore.IS_AUTH" class="header__title">
        Приветствую! Прошу пройти авторизацию!
      </strong>
      <div v-if="authenticatedStore.IS_AUTH" class="header__navigation">
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

    <div v-if="authenticatedStore.IS_AUTH" class="flex-column center">
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

      <mq-responsive target="tablet+">
        <button class="button" @click="$router.push('/profile')">
          Личный кабинет
        </button>
        <logout-action ref="logout" />
      </mq-responsive>
    </div>

    <div v-if="!authenticatedStore.IS_AUTH" class="flex-column center">
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

      <mq-responsive target="tablet+">
        <button-with-modal-form ref="signIn" label="Войти">
          <template #formSlot="{ closeModal }">
            <login-form @close="closeModal" />
          </template>
        </button-with-modal-form>
      </mq-responsive>

      <mq-responsive target="tablet+">
        <button-with-modal-form ref="signUp" label="Зарегистрироваться">
          <template #formSlot="{ closeModal }">
            <regisitration-form @close="closeModal" />
          </template>
        </button-with-modal-form>
      </mq-responsive>
    </div>
  </header>
</template>

<script>
import DropdownMenu from 'primevue/menu';
import LogoutAction from '@/components/actions/LogoutAction.vue';
import ButtonWithModalForm from '@/components/tools/ButtonWithModalForm.vue';
import RegisitrationForm from '@/components/forms/RegistrationForm.vue';
import LoginForm from '@/components/forms/LoginForm.vue';
import { MqResponsive } from 'vue3-mq';

import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { mapStores } from 'pinia';

export default {
  name: 'HeaderLayout',
  components: {
    ButtonWithModalForm,
    RegisitrationForm,
    LoginForm,
    LogoutAction,
    DropdownMenu,
    MqResponsive,
  },

  props: {},
  data() {
    return {
      headerLinks: [
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
      ],
      authMenuItems: [
        {
          label: 'Личный кабинет',
          icon: 'pi pi-search',
          command: () => {
            this.$router.push('/profile');
          },
        },
        {
          label: 'Выйти из системы',
          icon: 'pi pi-sign-out',
          command: () => {
            this.$refs.logout.confirmation();
          },
        },
      ],
      guestMenuItems: [
        {
          label: 'Войти',
          icon: 'pi pi-sign-in',
          command: () => {
            this.$refs.signIn.openModal();
          },
        },
        {
          label: 'Зарегистрироваться',
          icon: 'pi pi-book',
          command: () => {
            this.$refs.signUp.openModal();
          },
        },
      ],
    };
  },

  computed: {
    ...mapStores(useAuthenticatedStore),
  },
  methods: {
    openMenu(event) {
      this.$refs.menu.toggle(event);
    },
    getImgUrl(item) {
      return require(`@/assets/icons/${item}`);
    },
  },
};
</script>
