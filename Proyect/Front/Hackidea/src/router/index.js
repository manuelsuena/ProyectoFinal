import Vue from 'vue'
import VueRouter from 'vue-router'
import Error from '../views/Error.vue'
//importamos la función de verificar si esta loggeado
import { isLoggedIn } from "../api/utils.js";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      //RUTA PÚBLICA
      allowAnonymous: true,
      },
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    meta: {
      //RUTA PÚBLICA
      allowAnonymous: true,
      },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      //RUTA PÚBLICA
      allowAnonymous: true,
      },
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    meta: {
      //RUTA PRIVADA
      allowAnonymous: true,
      },
  },
  {
    path: '/',
    name: 'Landing',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Landing.vue'),
    meta: {
      //RUTA PÚBLICA
      allowAnonymous: true,
      },

  },
  {
    path: '/misideas',
    name: 'MisIdeas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MisIdeas.vue'),
    meta: {
      //RUTA PRIVADA
      allowAnonymous: true,
      },
  },
  {
    path: '/miscomentarios',
    name: 'Miscomentarios',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Miscomentarios.vue'),
    meta: {
      //RUTA PRIVADA
      allowAnonymous: true,
      },
  },


  {
    path: '/newidea',
    name: 'Newidea',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Newidea.vue'),
    meta: {
      //RUTA PRIVADA
      allowAnonymous: true,
      },

  },

  {
    path: '*',
    name: 'Error',
    component: Error
  },
];

const router = new VueRouter({
  routes
})

// COMPROBANDO CADA PÁGINA POR SI LA PERSONA ESTÁ LOGUEADA //
router.beforeEach((to, from, next) => {
  // SI LA RUTA ES PRIVADA Y LA PERSONA NO TIENE TOKEN //
  if (!to.meta.allowAnonymous && !isLoggedIn()) {
  next({
  path: "/login",
  query: { redirect: to.fullPath },
  });
  } else {
  next();
  }
  });

export default router
