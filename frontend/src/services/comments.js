import Vue from "vue";

export default {
  getComments: function (editorId) {
    return Vue.prototype.$axios.get(`comments/${editorId}`);
  },

  updateComments: function (editorId, comments) {
    return Vue.prototype.$axios.post(`comments/${editorId}`, comments);
  },
};
