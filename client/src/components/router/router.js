import VueRouter from "vue-router";
import AppMain from "../MainPage";
import SymptomAdviser from "../SymptomAdviser";
import PatientHistory from "../PatientHistory";

const routes = [
  { path: "/", component: AppMain },
  { path: "/adviser", component: SymptomAdviser },
  { path: "/diagnostic_history", component: PatientHistory }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export { router };
