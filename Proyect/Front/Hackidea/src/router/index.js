import Vue from 'vue'
import VueRouter from 'vue-router'
import Error from '../views/Error.vue'
import Login from '../views/Login.vue';
//importamos la función de verificar si esta loggeado
import { isLoggedIn } from "../api/utils.js";
import Swal from "sweetalert2";

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
      allowAnonymous: false,
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
      allowAnonymous: false,
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
      allowAnonymous: false,
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
      allowAnonymous: false,
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
// COMPROBAMOS LAS URLS Y ANALIZAMOS EL USUARIO
 router.beforeEach((to, from, next) => { 
  //Si la ruta no es pública y el usuario no está logueado...
   if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({ 
      //Lo redirigimos a la página de login
      path: "/login",
      query: { redirect: to.fullPath },
    });
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Lo sentimos. Esta ruta es sólo para usuarios resgistrados",
      showConfirmButton: true,
    });
  } else {
    next();
  }
}); 

export default router
