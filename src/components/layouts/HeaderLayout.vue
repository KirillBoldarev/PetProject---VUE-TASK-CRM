<template>
    <header class="header">
        <div class="header__logo">
            <img
                class="header__logo--icon"
                src="@/assets/icons/modalBackground.png"
                alt=""
            >
        </div>
        <div class="flex-column center">
            <strong class="header__title"
                    v-if="!authenticatedStore.IS_AUTH">
                Приветствую! Прошу пройти авторизацию!
            </strong>
            <div class="header__navigation"
                 v-if="authenticatedStore.IS_AUTH">
                <router-link
                    class="header__link"
                    v-for="link in headerLinks"
                    :key="link.name"
                    :to="link.url"
                >
                    <img
                        v-if="isMobile"
                        v-tooltip.bottom="link.name"
                        class="icon--max"
                        :src="getImgUrl(link.icon)"
                    >
                    <span v-if="isDesktop">{{ link.name }}</span></router-link
                >
            </div>
        </div>

        <div class="flex-column center"
             v-if="authenticatedStore.IS_AUTH">
            <template v-if="isMobile">
                <img
                    class="icon--max"
                    @click="openMenu"
                    src="@/assets/icons/menu.png"
                    alt=""
                >
                <dropdown-menu
                    id="overlay_menu"
                    ref="menu"
                    :model="authMenuItems"
                    :popup="true"
                />
            </template>

            <button
                class="button"
                @click="this.$router.push('/profile')"
                v-show="isDesktop"
            >
                Личный кабинет
            </button>
            <logout-action ref="logout"/>
        </div>

        <div class="flex-column center"
             v-if="!authenticatedStore.IS_AUTH">
            <template v-if="isMobile">
                <img
                    class="icon--max"
                    @click="openMenu"
                    src="@/assets/icons/menu.png"
                    alt=""
                >
                <dropdown-menu
                    id="overlay_menu"
                    ref="menu"
                    :model="guestMenuItems"
                    :popup="true"
                />
            </template>

            <button-with-modal-form ref="signIn"
                                    label="Войти"
                                    v-show="isDesktop">
                <template #formSlot="{ closeModal }">
                    <login-form @close="closeModal"
                                :userList="userList"/>
                </template>
            </button-with-modal-form>

            <button-with-modal-form
                ref="signUp"
                label="Зарегистрироваться"
                v-show="isDesktop"
            >
                <template #formSlot="{ closeModal }">
                    <regisitration-form @close="closeModal"
                                        :userList="userList"/>
                </template>
            </button-with-modal-form>
        </div>
    </header>
</template>

<script>
import { mapStores } from 'pinia';
import DropdownMenu from 'primevue/menu';
import LogoutAction from '@/components/actions/LogoutAction.vue';
import ButtonWithModalForm from '@/components/tools/ButtonWithModalForm.vue';
import RegisitrationForm from '@/components/forms/RegistrationForm.vue';
import LoginForm from '@/components/forms/LoginForm.vue';

import { useScreenResolutionStore } from '@/stores/ScreenResolution';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';

export default {
  name: 'HeaderLayout',
  components: {
    ButtonWithModalForm,
    RegisitrationForm,
    LoginForm,
    LogoutAction,
    DropdownMenu
  },

  props: {
    taskList: {
      type: Array,
      required: true
    },
    userList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headerLinks: [
        { name: 'Главная', url: '/', icon: 'home.png' },
        {
          name: 'Управление задачами',
          url: '/tasks',
          icon: 'task.png'
        },
        {
          name: 'Список пользователей',
          url: '/users',
          icon: 'user.png'
        }
      ],
      authMenuItems: [
        {
          label: 'Личный кабинет',
          icon: 'pi pi-search',
          command: () => {
            this.$router.push('/profile');
          }
        },
        {
          label: 'Выйти из системы',
          icon: 'pi pi-sign-out',
          command: () => {
            this.$refs.logout.confirmation();
          }
        }
      ],
      guestMenuItems: [
        {
          label: 'Войти',
          icon: 'pi pi-sign-in',
          command: () => {
            this.$refs.signIn.openModal();
          }
        },
        {
          label: 'Зарегистрироваться',
          icon: 'pi pi-book',
          command: () => {
            this.$refs.signUp.openModal();
          }
        }
      ]
    };
  },

  computed: {
    ...mapStores(useAuthenticatedStore, useScreenResolutionStore),
    isMobile() {
      return this.screenResolutionStore.IS_MOBILE;
    },
    isDesktop() {
      return this.screenResolutionStore.IS_DESKTOP;
    }
  },
  methods: {
    openMenu(event) {
      this.$refs.menu.toggle(event);
    },
    getImgUrl(item) {
      return require(`@/assets/icons/${item}`);
    }
  }
};
</script>
