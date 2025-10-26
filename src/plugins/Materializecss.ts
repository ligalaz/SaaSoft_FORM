import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

export default {
  install() {
    if (typeof window !== "undefined") {
      document.addEventListener("DOMContentLoaded", function () {
        M.AutoInit();
      });
    }
  },
};
