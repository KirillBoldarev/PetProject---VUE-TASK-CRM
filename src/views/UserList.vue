<template>
  <div class="container">
    <h2>Управление пользователями</h2>
    <div class="userlist">
      <div class="userlist__header">
        <div class="userlist__header-item">Имя</div>
        <div class="userlist__header-item">Роль</div>
        <div class="userlist__header-item">Электронная почта</div>
        <div class="userlist__header-item">Телефон</div>
        <div class="userlist__header-item">Активные задачи</div>
        <div class="userlist__header-item">Действия</div>
      </div>
      <div v-for="user in userList" :key="user.id" class="userlist__record">
        <div class="userlist__record-item">
          {{ user.firstName }} {{ user.secondName }}
        </div>
        <div class="userlist__record-item">{{ user.role }}</div>
        <div class="userlist__record-item">{{ user.email }}</div>
        <div class="userlist__record-item">{{ user.phone }}</div>
        <div class="userlist__record-item">Активные задачи</div>
        <div class="userlist__record-item">
          <img class="icon" src="@/icons/plus.png" alt="" />
          <img class="icon" src="@/icons/redirect.png" alt="" />
          <img class="icon" src="@/icons/edit.png" alt="" />
          <img
            @click="this.deleteCurrentUser(user)"
            class="icon"
            src="@/icons/trash.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },

  computed: {
    userList() {
      return this.$store.state.users.userList;
    },
  },

  methods: {
    deleteCurrentUser(user) {
      let filteredUserList = this.userList.filter(
        (users) => users.id !== user.id
      );
      localStorage.setItem("userList", JSON.stringify(filteredUserList));
      this.$store.commit("updateUserList");
    },
  },

  watch: {
    usersData() {
      this.users = this.usersData;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
}
.userlist {
  display: flex;
  flex-direction: column;
  gap: 30px;

  &__header {
    display: grid;
    grid-template-columns: 1fr 0.2fr 1fr 1fr 1fr 1fr;
    gap: 15px;
    justify-content: center;
    align-items: center;
    height: auto;
  }

  &__header-item {
    border: 1px solid red;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5px;
    min-height: 100%;
    gap: 10px;

    &:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    &:last-child {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }

  &__record {
    display: grid;
    grid-template-columns: 1fr 0.2fr 1fr 1fr 1fr 1fr;
    gap: 15px;
    justify-content: center;
    align-items: center;
    height: auto;
  }

  &__record-item {
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5px;
    min-height: 100%;

    &:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    &:last-child {
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
    }
  }
}

.icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 5px 10px;
}

h2 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
</style>
