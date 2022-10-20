<template>
  <section id="confirmForm" class="container">
    <h2>Вы уверены ?</h2>
    <div class="button__container">
      <button @click="confirm" class="button__ok">Да</button>
      <button @click="close" class="button__cancel">Нет</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "ConfirmForm",
  data() {
    return {};
  },

  methods: {
    confirm() {
      this.$emit("confirm");
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  font-size: 24;
  font-weight: 700;
}
.button__container {
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: space-around;
  align-items: center;
}
.button__cancel {
  position: relative;
  display: inline-block;
  font-family: Arial, Helvetica, FreeSans, "Liberation Sans", "Nimbus Sans L",
    sans-serif;
  font-size: 1.5em;
  font-weight: 700;
  width: 100px;
  height: 50px;
  color: rgb(245, 245, 245);
  text-shadow: 0 -1px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  user-select: none;
  outline: none;
  border: none;
  border-radius: 3px;
  background: #f10d0d linear-gradient(#f53d3d, #f70000);
  box-shadow: inset #e90303 0 -1px 1px, inset 0 1px 1px #fd1e1e,
    #ff0000 0 0 0 1px, rgba(0, 0, 0, 0.3) 0 2px 5px;
  -webkit-animation: pulsate 1.2s linear infinite;
  animation: pulsate 1.2s linear infinite;

  &:hover {
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
    cursor: pointer;
  }

  &:active {
    top: 1px;
    color: #fff;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.3), 0 0 5px #ffd, 0 0 8px #fff;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.3), 0 1px 1px #fff,
      inset 0 1px 2px rgba(0, 0, 0, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05);
  }
}

.button__ok {
  position: relative;
  display: inline-block;
  font-family: Arial, Helvetica, FreeSans, "Liberation Sans", "Nimbus Sans L",
    sans-serif;
  font-size: 1.5em;
  font-weight: 700;
  width: 100px;
  height: 50px;
  color: rgb(245, 245, 245);
  text-shadow: 0 -1px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  user-select: none;
  outline: none;
  border: none;
  border-radius: 3px;
  background: #0c9c0d linear-gradient(#82d18d, #0c9c0d);
  box-shadow: inset #72de26 0 -1px 1px, inset 0 1px 1px #98ff98,
    #3caa3c 0 0 0 1px, rgba(0, 0, 0, 0.3) 0 2px 5px;
  -webkit-animation: pulsate 1.2s linear infinite;
  animation: pulsate 1.2s linear infinite;

  &:hover {
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
    cursor: pointer;
  }

  &:active {
    top: 1px;
    color: #fff;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.3), 0 0 5px #ffd, 0 0 8px #fff;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.3), 0 1px 1px #fff,
      inset 0 1px 2px rgba(0, 0, 0, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.05);
  }
}

@-webkit-keyframes pulsate {
  50% {
    color: #fff;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.3), 0 0 5px #ffd, 0 0 8px #fff;
  }
}
@keyframes pulsate {
  50% {
    color: #fff;
    text-shadow: 0 -1px rgba(0, 0, 0, 0.3), 0 0 5px #ffd, 0 0 8px #fff;
  }
}
</style>
