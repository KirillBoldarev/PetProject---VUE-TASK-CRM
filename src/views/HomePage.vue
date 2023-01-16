<template>
  <div class="page">
    <div class="page__body">
      <h2 class="page__title">Приветствую на главной странице!</h2>
      <div v-if="!authenticatedStore.IS_AUTH" class="page__text">
        Для начала работы системы , прошу пройти &nbsp;
        <button-with-modal-form label="регистрацию">
          <template #formSlot="{ closeModal }">
            <regisitration-form @close="closeModal" />
          </template>
        </button-with-modal-form>
        &nbsp; или же &nbsp;
        <button-with-modal-form label="войти в систему">
          <template #formSlot="{ closeModal }">
            <login-form @close="closeModal" />
          </template>
        </button-with-modal-form>
        &nbsp;, если у вас есть учетная запись.
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonWithModalForm from '@/components/tools/ButtonWithModalForm.vue';
import RegisitrationForm from '@/components/forms/RegistrationForm.vue';
import LoginForm from '@/components/forms/LoginForm.vue';

import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';

const authenticatedStore = useAuthenticatedStore();
</script>
