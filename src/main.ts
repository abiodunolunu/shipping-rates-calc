import { createApp } from "vue";
import "../src/index.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const clickOutside = {
  beforeMount: (
    el: {
      clickOutsideEvent: { (event: any): void; (this: Document, ev: MouseEvent): any };
      contains: (arg0: any) => any;
    },
    binding: { value: () => void }
  ) => {
    el.clickOutsideEvent = (event) => {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el: { clickOutsideEvent: (this: Document, ev: MouseEvent) => any }) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

app.use(router).directive("click-outside", clickOutside).mount("#app");
