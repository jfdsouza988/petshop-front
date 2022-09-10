import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Pets from "../views/Pets.vue";
import Owners from "../views/Owners.vue";
import Form from "../views/owners/Form.vue";
import List from "../views/owners/List.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Pets",
    component: Pets,
  },
  {
    path: "/owners",
    component: Owners,
    children: [
      {
        path: "",
        name: "Owners",
        component: List,
      },
      {
        path: "new",
        name: "New owner",
        component: Form,
      },
      {
        path: ":id",
        name: "Edit owner",
        component: Form,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
