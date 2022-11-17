import localbase from "@/js/localbase";

export default {
  state: {
    fileList: [],
  },
  getters: {
    getFileList(state) {
      return state.fileList;
    },
  },
  mutations: {
    initalizeFileList(state, resultFromAction) {
      state.fileList = resultFromAction;
    },
    addFile(state, targetFile) {
      state.fileList.push(targetFile);
    },
    deleteFile(state, targetFile) {
      let index;
      state.fileList.forEach((file, idx) => {
        if (file.id === targetFile.id) {
          index = idx;
        }
      });
      state.taskList.splice(index, 1);
    },
  },
  actions: {
    initializeFileListAction(context) {
      localbase
        .collection("files")
        .get()
        .then((result) => {
          context.commit("initalizeFileList", result);
        });
    },
  },
};
