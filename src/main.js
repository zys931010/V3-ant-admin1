import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { setupAntd } from "./ant-design-vue";
import "../mockjs/mock";

const app = createApp(App);

setupAntd(app);
app.use(router);
app.use(store);
app.mount("#app");
