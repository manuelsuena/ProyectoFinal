<template>
   <!-- Se crean los elementos del HTML -->
  <div >
    <div id="nav">
       <img src="../assets/logofinal.png" alt="logo">
      <router-link :to="{name:'Login'}" v-show="!checkLogin()"> Login</router-link>
       <router-link :to="{ name: 'Register'}" v-show="!checkLogin()">Registro</router-link> 
      <router-link :to="{name:'Landing'}" > Portada</router-link> 
       <router-link :to="{name:'About'}"> About</router-link> 
        <router-link :to="{name:'Newidea'}" > Newidea </router-link>
       <div class="desplegable"> 
          <button class="botondesplegable"> Perfil</button>
          <div class="enlacesdesplegables">
        <router-link :to="{name:'Profile'}"> Profile </router-link>  
      <router-link :to="{name:'MisIdeas'}" > Misideas</router-link> 
       <router-link :to="{name:'Miscomentarios'}"> Miscomentarios</router-link> 
     </div>
        </div>
           <button class="botonlogout" @click="logOutUser()"> Logout</button>
       </div>
         
  </div>
</template>

<!-- Importamos y Exportamos las variables y su tipo que queremos que aparezcan en la vista  -->
<script>
import { clearLogin, isLoggedIn } from "../api/utils";
import { logOut } from "../api/utils.js"
import vueHeadful from 'vue-headful';
export default {
  name: 'MenuCustom',

  methods: {
    logOutUser() {
      logOut();
      this.$router.push("/login");
    },
     checkLogin() {
      return isLoggedIn();
    },
  },
};
</script>

<!--Estilo -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50
}

img {
  width: 250px;
  padding: 1rem;
}
#nav {
  margin-bottom: 4rem;
}

#nav a {
  font-weight: bold;
  color: black;
  margin: 1rem;
  font-size: 1.25rem;
}

#nav a.router-link-exact-active {
  color: red;
  margin: 1rem;
}
.botondesplegable{
  background-color: white;
  color:black;
  padding: 0.5rem;
  font-size: 1.25rem;
  border: none;
}
.desplegable {
  position: relative;
  display: inline-block;
  margin-left: 6rem;
 } 

.enlacesdesplegables{
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
}

.enlacesdesplegables a:hover {
box-shadow: inset 5em 1em gold;
} 
.desplegable:hover .enlacesdesplegables {
  display: block;
}
.desplegable:hover .botondesplegable {
  background-color:black;
  color: white;
}
.botonlogout{
  margin: 2rem;
  padding: 0.5rem;
  font-size: 1rem;
}

</style>

