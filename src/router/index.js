import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home.vue";
import NotFound from "@/views/not-found.vue";
import store from "@/store";
import { LOGIN, LOGOUT } from "@/store/mutation-types";

const domain = new URL(window.location.href);
const oAuthUrl = new URL("http://localhost:8080/oauth2/authorization/google");

const loginIfTokenExists = (token) => {
  if (token) {
    store.commit(LOGIN, token);
  }
};

const redirectToLogin = (to, from, next) => {
  loginIfTokenExists(to.query.token);

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (!requiresAuth) {
    next();
    return;
  }

  if (store.getters.isAuthenticated) {
    next();
    return;
  }

  next({
    path: "/login",
    query: {
      redirect: to.fullPath,
    },
  });
};

const redirectToOAuthLogin = () => (to, from) => {
  const fullPathWithDomain = new URL(from.fullPath, domain).toString();
  oAuthUrl.searchParams.append("redirect_uri", fullPathWithDomain);
  window.location = oAuthUrl;
};

const redirectToLogout = () => (to, from, next) => {
  store.commit(LOGOUT);
  next("/");
};

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/member",
    name: "member",
    component: () =>
      import(/* webpackChunkName: "member" */ "@/views/member.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import(/* webpackChunkName: "admin" */ "@/views/admin"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: redirectToOAuthLogin(),
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: redirectToLogout(),
  },
  {
    path: "/:pathMatch(.*)",
    name: "not-found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(redirectToLogin);

export default router;
