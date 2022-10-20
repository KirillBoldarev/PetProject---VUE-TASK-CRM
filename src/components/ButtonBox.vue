<template>
  <div class="buttonbox">
    <div v-if="this.isAuthenticated === true" class="buttonbox--authenticated">
      <div class="column">
        <div class="greeting">
          {{ this.greeting }}
        </div>
        <div class="row">
          <profile-button></profile-button>
          <logout-button></logout-button>
        </div>
      </div>
    </div>
    <div v-if="this.isAuthenticated === false" class="buttonbox--guest">
      <registration-button></registration-button>
      <login-button></login-button>
    </div>
  </div>
</template>

<script>
import RegistrationButton from "@/components/RegistrationButton.vue";
import LoginButton from "@/components/LoginButton.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import ProfileButton from "@/components/ProfileButton.vue";

export default {
  components: { RegistrationButton, LoginButton, LogoutButton, ProfileButton },
  name: "ButtonBox",

  data() {
    return {
      authenticatedUser: null,
    };
  },

  methods: {},

  computed: {
    isAuthenticated() {
      return this.$store.getters.checkForAuthenticate;
    },

    greeting() {
      let message = `Приветствуем, ${this.$store.getters.authenticatedUser.firstName} ${this.$store.getters.authenticatedUser.secondName}!`;
      return message;
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.buttonbox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &--guest {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  &--authenticated {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  &__button {
    position: relative;
    display: inline-block;
    font-size: 90%;
    font-weight: 700;
    color: rgb(209, 209, 217);
    text-decoration: none;
    text-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2);
    padding: 0.5em 1em;
    outline: none;
    border-radius: 3px;
    background: linear-gradient(rgb(110, 112, 120), rgb(81, 81, 86))
      rgb(110, 112, 120);
    box-shadow: 0 1px rgba(255, 255, 255, 0.2) inset,
      0 3px 5px rgba(0, 1, 6, 0.5), 0 0 1px 1px rgba(0, 1, 6, 0.2);
    transition: 0.2s ease-in-out;

    &:hover:not(:active) {
      background: linear-gradient(rgb(126, 126, 134), rgb(70, 71, 76))
        rgb(126, 126, 134);
    }
    &:active {
      top: 1px;
      background: linear-gradient(rgb(76, 77, 82), rgb(56, 57, 62))
        rgb(76, 77, 82);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.5) inset,
        0 2px 3px rgba(0, 0, 0, 0.5) inset, 0 1px 1px rgba(255, 255, 255, 0.1);
    }
  }
  .column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .row {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .greeting {
    text-align: center;
    font-weight: 700;
    font-size: 18;
  }
}
</style>
