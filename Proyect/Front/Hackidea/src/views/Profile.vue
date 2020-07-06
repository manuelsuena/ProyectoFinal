<template>
  <div>

              <!-- Se aplica el cambio de nombre-->
            <vue-headful title="Profile"
         description="Página perfil usuario."/>

          <!-- Menú de la página  -->
      <MenuCustom> </MenuCustom>
    
               <!--Elementos HTML  -->
    <div class="dataIni">
   <h2> Perfil de: {{usuario.nombre}} </h2>
   <p> Información del usuario</p>
   <p> <strong> Nombre: </strong>  {{usuario.nombre}}</p>
   <p> <strong>  Apellidos: </strong> {{usuario.apellidos}}</p>
   <p> <strong>  Nickname:</strong> {{usuario.nickname}}</p>
   <p> <strong> Email: </strong> {{usuario.email}}</p>
   <button @click="showEditUser()"> modificar</button>

      </div>
        <div class="modal" v-show="showEdit">
      <h3>Modifica tus datos:</h3>
      <label for="name">Nombre:</label>
      <input type="text" v-model="newNombre" placeholder="nombre" />
      <label for="name">Apellidos:</label>
      <input type="text" v-model="newApellidos" placeholder="apellidos" />
      <label for="name">Nickname:</label>
      <input type="text" v-model="newNickname" placeholder="nickname" />
      <br />
      <button @click="updateUser()">Update</button>
      <button @click="closeModal()"> Cerrar</button>
   
      <br />
      </div>

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
    name: 'Profile',
    components:{
           FooterCustom,
           MenuCustom,
       },
    data(){
        return {
            usuario:{},
            idea:{},
         
            showEdit: false,
            newNombre: '',
            newApellidos: '',
            newNickname: '',
            showIdea: false,
        }
    },

    // Funcióin validar y agregar usuarios
    methods: {
        getUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/user/'+ data)
        .then(function(response) {
          self.usuario = response.data.data;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },

    closeModal(){
      this.showEdit = false;
    },

        showEditUser(index) {
      this.showEdit = true;
      this.newNombre = this.usuario.nombre;
      this.newApellidos = this.usuario.apellidos;
      this.newNickname = this.usuario.nickname;
    },
        updateUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put('http://localhost:3009/user/' + data, {
          nombre: self.newNombre,
          apellidos: self.newApellidos,
          nickname: self.newNickname,
        })
        .then(function(response) {
             location.reload()
             self.showEdit = false;
        })
          .catch(function (error){
                console.alert(error, 'No se pudo actualizar')
             })
              Swal.fire({
             icon: "success",
             title: 'Usuario modificado',
             text: "Ya puedes ver las modificaciones de tu perfil"
              })
        },
    },
      created(){
    this.getUser();
}
}
</script>

<style scoped>

button{
    padding: 0.7rem;
    background: rgb(101, 156, 219);
    color: white;
    font-size: 1rem;
     margin: 1.5rem;
     border-radius: 18%;
}
h2{
    color: rgb(20, 93, 177);
    margin-bottom: 4rem;
  
}
.modal {
   margin-top: -18rem;
  position: relative;
  background-color: #fefefe;
  padding: 2rem;
  border: 1px solid #888;
   width: 100%; 
  height: 30rem; 
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: animatetop;
  animation-duration: 0.3s;
}

.modal button {
    margin-top: 3rem;
    border-radius: 18%;
}

.modal h3 {
  color:  rgb(0, 101, 216);
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.footer{
  margin-top: 10rem;
}

.dataIni{
  background: white;
  width: 25%;
  padding: 1rem;
  display: inline-block;
}
input{
  margin: 0.5rem;
  margin-top: 2rem;
}


</style>

