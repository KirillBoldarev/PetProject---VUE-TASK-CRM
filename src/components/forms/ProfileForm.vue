<template>
  <section id="profileForm" class="form__container">
    <div class="form__header">
      <h2 class="form__title">Профиль пользователя</h2>
      <img
        @click="this.editMode = !this.editMode"
        v-tooltip.bottom="'Нажмите для редактирования'"
        class="icon"
        src="@/icons/edit.png"
        alt=""
      />
    </div>

    <form class="form__body" @submit.prevent="confirmation">
      <confirm-dialog
        :isDialogOpen="isDialogOpen"
        @confirm="this.editUser"
        @close="isDialogOpen = false"
      ></confirm-dialog>

      <div class="form__row">
        <div class="form__group">
          <label class="form__label" for="firtstName">Имя</label>
          <input
            @blur="v$.firstName.$touch"
            v-model="firstName"
            class="form__input"
            type="firtstName"
            name="firstName"
            :disabled="editMode === false"
          />
          <div class="form__row">
            <transition>
              <small
                v-if="v$.firstName.$dirty && v$.firstName.required.$invalid"
                class="form__invalid"
                >Поле обязательно для заполнения
              </small>
            </transition>
          </div>
        </div>

        <div class="form__group">
          <label class="form__label" for="secondName">Фамилия</label>
          <input
            @blur="v$.secondName.$touch"
            v-model="secondName"
            class="form__input"
            type="text"
            name="secondName"
            :disabled="editMode === false"
          />
          <div class="form__row">
            <transition>
              <small
                v-if="v$.secondName.$dirty && v$.secondName.required.$invalid"
                class="form__invalid"
                >Поле обязательно для заполнения
              </small>
            </transition>
          </div>
        </div>
      </div>

      <div class="form__row">
        <div class="form__group">
          <label class="form__label" for="email">Электронная почта</label>
          <input
            @blur="v$.email.$touch"
            v-model="email"
            class="form__input"
            type="email"
            name="email"
            :disabled="editMode === false"
          />
          <div class="form__column">
            <transition-group>
              <small
                v-if="v$.email.$dirty && v$.email.required.$invalid"
                class="form__invalid"
                >Поле обязательно для заполнения
              </small>
              <small
                v-else-if="v$.email.$dirty && v$.email.email.$invalid"
                class="form__invalid"
                >Некорректный формат электронной почты
              </small>
            </transition-group>
          </div>
        </div>
        <div class="form__group">
          <label class="form__label" for="phone">Номер телефона</label>
          <input
            @blur="v$.phone.$touch"
            v-model="phone"
            class="form__input"
            type="text"
            name="phone"
            :disabled="editMode === false"
          />
          <div class="form__column">
            <transition-group>
              <small
                v-if="v$.phone.$dirty && v$.phone.required.$invalid"
                class="form__invalid"
                >Поле обязательно для заполнения
              </small>
              <small
                v-else-if="v$.phone.$dirty && v$.phone.isPhone.$invalid"
                class="form__invalid"
                >Некорректный формат телефона
              </small>
            </transition-group>
          </div>
        </div>
      </div>

      <div class="form__group">
        <label class="form__label" for="password">Пароль</label>
        <input
          @blur="v$.password.$touch"
          v-model="password"
          class="form__input"
          type="password"
          name="password"
          :disabled="editMode === false"
        />
        <div class="form__column">
          <transition-group>
            <small
              v-if="v$.password.$dirty && v$.password.required.$invalid"
              class="form__invalid"
              >Поле обязательно для заполнения
            </small>
            <small
              v-if="v$.password.$dirty && v$.password.minLength.$invalid"
              class="form__invalid"
              >Введите не менее {{ v$.password.minLength.$params.min }} символов
            </small>
          </transition-group>
        </div>
      </div>

      <div class="form__group">
        <button class="form__button" type="submit">Принять</button>
      </div>
    </form>
  </section>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import confirmationDialogMixin from "@/js/mixins/confirmationDialogMixin";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { isPhone } from "@/js/validation";

export default {
  components: { ConfirmDialog },
  mixins: [confirmationDialogMixin],
  name: "ProfileForm",

  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      firstName: this.$store.getters.authenticatedUser.firstName,
      secondName: this.$store.getters.authenticatedUser.secondName,
      email: this.$store.getters.authenticatedUser.email,
      phone: this.$store.getters.authenticatedUser.phone,
      password: this.$store.getters.authenticatedUser.password,
      id: this.$store.getters.authenticatedUser.id,
      role: this.$store.getters.authenticatedUser.role,

      isOpenTaskList: false,
      editMode: false,
      taskListMode: false,
    };
  },

  validations() {
    return {
      firstName: { required },
      secondName: { required },
      email: {
        required,
        email,
      },
      phone: { required, isPhone },
      password: { required, minLength: minLength(5) },
    };
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

  created() {},
  methods: {
    editUser() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.$store.commit("editUser", this.changedData);
      this.$store.commit("updateAuthenticated");
      this.$emit("close");
    },
  },

  computed: {
    changedData() {
      return {
        id: this.id,
        firstName: this.firstName,
        secondName: this.secondName,
        email: this.email,
        phone: this.phone,
        password: this.password,
        role: this.role,
      };
    },
  },
};
</script>
