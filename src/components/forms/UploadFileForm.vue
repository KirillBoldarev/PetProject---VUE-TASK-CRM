<template>
  <div class="form__group">
    <label @click.stop="info" for="">Загрузите файл</label>
    <div class="form__row">
      <input
        class="form__input"
        name="myFile"
        type="file"
        v-on:change="previewFile"
        multiple
      />
      <button @click.prevent.stop="uploadFile">Загрузить файлы</button>
    </div>
    <div v-for="file in files" :key="file">{{ file.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    target: {
      type: Object,
      required: true,
    },
  },
  mixins: [],
  data() {
    return {
      preparedFiles: [],
    };
  },

  methods: {
    info() {
      console.log("файлЛист в сторе", this.$store.getters.getFileList);
    },
    previewFile(event) {
      console.log("Евент Таргет Файлз", event.target.files);
      this.preparedFiles.push(...event.target.files);
    },
    uploadFile() {
      this.preparedFiles.forEach((file) => {
        file.id = Math.random().toString(36).substring(2, 9);
        file.owner = this.target.id;
      });
      this.preparedFiles.forEach((file) => {
        console.log(file);
        this.$store.commit("addFile", file);
      });
    },
  },
  computed: {},

  mounted() {},
};
</script>
