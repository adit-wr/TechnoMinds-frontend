import { createRouter, createWebHistory } from "vue-router";
import AdminView from "../views/AdminView.vue";
import UserView from "../views/UserView.vue";
import LoginViews from "../views/LoginViews.vue";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginViews
  },
  {
    path: "/admin/:component",
    name: "admin",
    component: AdminView,
    props: true,
    meta: {
      requiresAuth: true,
      role: "admin",
    }
  },
  {
    path: "/user/:component",
    name: "user",
    component: UserView,
    props: true,
    meta: {
      requiresAuth: true,
      role: "user",
    }
  },
  {
    path: "/",
    redirect: { name: "admin", params: { component: "home" } },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("auth");
  const userRole = localStorage.getItem("role");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (to.meta.requiresAuth && isAuthenticated && to.meta.role !== userRole) {
    alert("You are not authorized to access this page");
    next(false); 
  } else {
    next(); 
  }
});

export default router;


