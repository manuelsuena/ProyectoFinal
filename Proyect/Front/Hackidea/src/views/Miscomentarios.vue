<template>
  <div class="main">

              <!-- Se aplica el cambio de nombre-->
            <vue-headful title="Mis Comentarios"
         description="Página de los comentarios del usuario."/>

          <!-- Menú de la página  -->
      <MenuCustom> </MenuCustom>
    
      
               <!--Elementos HTML  -->
   <h2> Mis comentarios  </h2>
 
   <ul class="comentarios" v-for="(coment, index) in coments" :key="coment.id">  
     <li>
          <p>{{coment.mensaje}}</p>
   <p id="id"> {{coment.id_comentario}}</p>
     <button @click="deleteMensajes(index)"> Eliminar </button>
     </li>
  
        </ul>
     
 <div class="footer">
    <FooterCustom> </FooterCustom>
 </div>
 

  </div>
</template>

<script>
/* Importamos los componentes que queremos utilizar en esta vista */
import MenuCustom from '@/components/MenuCustom.vue'
import FooterCustom from '@/components/FooterCustom.vue'
import axios from 'axios'
import IdeasCustom from '@/components/IdeasCustom.vue'
import Swal from "sweetalert2";

export default {
    name: 'Miscomentarios',
    components:{
           FooterCustom,
           MenuCustom,
       },
    data(){
        return {
           coments:[],

        }
    },

    // Funcióin validar y agregar usuarios
    methods: {
        getMensajes() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/user/message/'+ data)
        .then(function(response) {
          self.coments = response.data.data;
          console.log(self.coments[0].id_comentario)
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
        deleteMensajes(index) {
       const self = this;
      const data = self.coments[index].id_comentario;
      axios.delete('http://localhost:3009/user/message/' + data)
          
        .then(function(response) {
            location.reload()
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        })
         Swal.fire({
        icon: "success",
        title: 'Mensaje eliminado',
        text: "Haz borrado el mensaje",
         })
        },
    },
      created(){
    this.getMensajes();
}
}
</script>

<style scoped>
 .main {
  width: 100%;
  background-image: url(../assets/backla.png);
    background-repeat: no-repeat;
    background-size: 1700px 950px;
    height: 950px;
}
.comentarios {
  margin: 2rem;
}

button{
    padding: 0.7rem;
    background: rgb(101, 156, 219);
     color: rgb(20, 2, 2);
      border-radius: 2rem;
      font-size: 1.15rem;
}
h2{
    color: rgb(20, 93, 177);
}

li {
  list-style:none;

}

#id{
  margin: -0.5rem;
  color: transparent;
}
ul {
  width: 90%;
   border: solid black 2px;
   border-radius: 2rem;
   padding: 1rem;
   background: rgb(230, 226, 226);
   margin-left: 2rem;
   color: rgb(0, 0, 0);
}
.footer{
  margin-top: 10rem;
}
</style>

