<template class="body">
  <div class="main">

         <!-- Se aplica el cambio de nombre-->
       <vue-headful title= "Login"
     description="Página para loggin."/>

       <!-- Menú de la página  -->
       <div class="menus">
      <MenuCustom> </MenuCustom>
        </div>
         
       <!--Elementos HTML  -->
    <div id="input"> 
      <h2> Iniciar sesión </h2>
     <p  v-show="required"> tienes datos aun por rellenar </p>
     <label for="Email"> Email:</label>
     <br>
    <input  type="text" placeholder="Escribe tu email"
    v-model="email">
    <label for=" password"> Password:</label>
     <input type="password" placeholder="Escribe tu contraseña"
    v-model="contrasena">
    <br>

<button @click="login()"> Entrar </button>
 </div>

 <br>
 <br>
 <div class="Footer">
 <FooterCustom> </FooterCustom>
  </div>
  </div>
</template>

<script>
/* Importamos los componentes que queremos utilizar en esta vista */
import axios from "axios";
import MenuCustom from '@/components/MenuCustom.vue'
import FooterCustom from '@/components/FooterCustom.vue'
import Swal from "sweetalert2"

export default { 
    name: 'Login',
    components:{
           FooterCustom,
           MenuCustom,
       },
     data(){
         return {
            email: '',
            contrasena: '',
           correctData: false,
            required: false,
         }
     },
      methods: {
     // Función de logear
        login(){
             const self = this
             axios.post(('http://localhost:3009/user/login'),{
                 email: self.email,
                 contrasena: self.contrasena,
             })
             .then(function (response){
               localStorage.setItem("token", response.data.data.token);
               localStorage.setItem("role", response.data.data.role);
               localStorage.setItem("nombres", response.data.data.nombre);
               localStorage.setItem("id", response.data.data.id);
                self.$router.push("/");
              })

             .catch(function (error){
                console.log(error)
             })
            
        },
      }
}

</script>

<style scoped>
.body{
  height: 700px;
}

.menus{
  margin-bottom: 10rem;
}
.main {
  width: 100%;
  background-image: url(../assets/backpla.png);
    background-repeat: no-repeat;
    background-size: 1700px 790px;
    height: 790px;
}
input{
    padding: 0.8rem;
    margin: 1rem;
}
label {
   font-size: 1.35rem;
    display: block;
    padding: 0,2rem;
    margin: 0,2rem;
} 
/* label{
  color: black;
  font-size: 1.35rem;
  margin-left: -1rem;
}
input{
  margin-bottom: 1rem;
    padding: 1rem;
    margin: 1rem;
} */
button {
    padding: 1rem;
    border-radius: 18%;
    background: rgb(31, 26, 95);
    color: white;
    margin: 0.5rem;
}
h2{

   color: white;
}


#input {
    display: inline-block;
    width: 20%;
    padding: 1rem;
    
}

</style>
