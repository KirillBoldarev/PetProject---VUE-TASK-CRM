<template>
  <footer class="footer">
    <div class="footer__top">
      <h2>{{ this.$store.state.authentication.taskList }}</h2>
    </div>
    <div class="footer__main">FOOTER MAIN</div>
    <div class="footer__bottom">FOOTER BOTTOM</div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  gap: 5px;
  padding: 5px;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: green;
  margin: 0 auto;
  max-width: 1400px;
}
</style>
