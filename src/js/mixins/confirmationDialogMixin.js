export default {
  data() {
    return {
      isDialogOpen: false,
    };
  },
  methods: {
    confirmation() {
      this.isDialogOpen = true;
    },
  },
};
