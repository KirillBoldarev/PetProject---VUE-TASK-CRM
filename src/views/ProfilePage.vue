<template>
  <div class="page">
    <div class="page__body">
      <h2 class="page__title">
        Профиль пользователя : {{ this.$store.getters.getAuth.login }}
        <span
          v-if="
            this.$store.getters.getAuth.firstName &&
            this.$store.getters.getAuth.secondName
          "
        >
          - {{ this.$store.getters.getAuth.firstName }}
          {{ this.$store.getters.getAuth.secondName }}</span
        >
      </h2>
      <div class="flex-row center">
        <img
          @click="this.editUserMode = !this.editUserMode"
          v-tooltip.bottom="'Нажмите для редактирования'"
          class="icon"
          src="@/icons/edit.png"
          alt=""
        />
      </div>

      <edit-user-form
        v-if="editUserMode"
        @edited="this.editUserMode = !this.editUserMode"
        :target="this.$store.getters.getAuth"
        :userList="userList"
        :taskList="taskList"
      ></edit-user-form>
      <!-- <div class="flex-row center">
        <form class="form__body" @submit.prevent="confirmation">
          <confirm-dialog
            :isDialogOpen="isDialogOpen"
            @confirm="this.editUser"
            @close="isDialogOpen = false"
          ></confirm-dialog>

          <div class="flex-row center">
            <div class="flex-column center">
              <label class="form__label" for="firtstName">Имя</label>
              <input
                @blur="v$.firstName.$touch"
                v-model="firstName"
                class="form__input"
                type="firtstName"
                name="firstName"
                :disabled="editUserMode === false"
              />
              <div class="flex-row center">
                <transition>
                  <small
                    v-if="v$.firstName.$dirty && v$.firstName.required.$invalid"
                    class="form__invalid"
                    >Поле обязательно для заполнения
                  </small>
                </transition>
              </div>
            </div>

            <div class="flex-column center">
              <label class="form__label" for="secondName">Фамилия</label>
              <input
                @blur="v$.secondName.$touch"
                v-model="secondName"
                class="form__input"
                type="text"
                name="secondName"
                :disabled="editUserMode === false"
              />
              <div class="flex-row center">
                <transition>
                  <small
                    v-if="
                      v$.secondName.$dirty && v$.secondName.required.$invalid
                    "
                    class="form__invalid"
                    >Поле обязательно для заполнения
                  </small>
                </transition>
              </div>
            </div>
          </div>

          <div class="flex-row center">
            <div class="flex-column center">
              <label class="form__label" for="email">Электронная почта</label>
              <input
                @blur="v$.email.$touch"
                v-model="email"
                class="form__input"
                type="email"
                name="email"
                :disabled="editUserMode === false"
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
            <div class="flex-column center">
              <label class="form__label" for="phone">Номер телефона</label>
              <input
                @blur="v$.phone.$touch"
                v-model="phone"
                class="form__input"
                type="text"
                name="phone"
                :disabled="editUserMode === false"
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

          <div class="flex-column center">
            <label class="form__label" for="password">Пароль</label>
            <input
              @blur="v$.password.$touch"
              v-model="password"
              class="form__input"
              type="password"
              name="password"
              :disabled="editUserMode === false"
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
                  >Введите не менее
                  {{ v$.password.minLength.$params.min }} символов
                </small>
              </transition-group>
            </div>
          </div>

          <div class="flex-column center">
            <button class="button" type="submit">Принять</button>
          </div>
        </form>
      </div> -->
    </div>
  </div>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import confirmationDialogMixin from "@/js/mixins/confirmationDialogMixin";
import EditUserForm from "@/components/forms/EditUserForm.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { isPhone } from "@/js/validation";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },

  data() {
    return {
      login: this.$store.getters.getAuth.login,
      firstName: this.$store.getters.getAuth.firstName,
      secondName: this.$store.getters.getAuth.secondName,
      email: this.$store.getters.getAuth.email,
      phone: this.$store.getters.getAuth.phone,
      password: this.$store.getters.getAuth.password,
      id: this.$store.getters.getAuth.id,
      role: this.$store.getters.getAuth.role,

      editUserMode: false,
    };
  },

  components: {
    ConfirmDialog,
    EditUserForm,
  },

  mixins: [confirmationDialogMixin],

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

  beforeCreate() {
    if (this.$store.getters.isAuth === false) {
      this.$router.push("/");
    }
  },

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
