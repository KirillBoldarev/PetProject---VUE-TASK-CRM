<template>
  <div class="page">
    <h2 class="page__title">Приветствую на главной странице!</h2>
    <div class="page__body">
      <button @click="getApiData">Получить данные</button>
      <button @click="this.setApiData">Отправить данные</button>
      <button @click="this.getUsers">Вывести массив пользователей</button>
      <button @click="this.getTasks">Вывести массив тасков</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import localbase from "@/js/localbase";

export default {
  props: {
    userList: {
      type: Array,
      required: true,
    },
  },
  components: {},
  date() {
    return {};
  },

  methods: {
    getApiData() {
      let url = "https://jsonplaceholder.typicode.com/users";
      /*       let response = await fetch(url);
      let result = await response.json();
      console.log(result); */

      axios(url).then((response) => {
        console.log("Данные получены :", response.data);
      });

      /*       axios
        .get(url)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error)); */

      /*       fetch(url)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((result) => console.log(result))
        .catch((error) => console.log("ошибка:", error)); */
    },

    setApiData() {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          text: "Текст моего поста",
        })
        .then((response) => {
          if (response.status > 400) {
            console.log("Чтото пошло не так");
          }
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },

    getUsers() {

      console.log(localbase
        .collection("users")
        .get())
      /* localbase
        .collection("users")
        .get()
        .then((users) => {
          console.log(users);
        }) */;
    },
    async getTasks() {
      let tasks = await localbase.collection("tasks").get();
      console.log(tasks);
      return tasks
    },
  },
};
</script>
