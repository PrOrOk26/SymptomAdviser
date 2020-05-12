import VueRouter from "vue-router";
import AppMain from "../MainPage";
import SymptomAdviser from "../SymptomAdviser";

const routes = [
  { path: "/", component: AppMain },
  { path: "/adviser", component: SymptomAdviser }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export { router }
