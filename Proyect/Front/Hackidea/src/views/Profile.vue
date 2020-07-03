<template>
  <div class="main">

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
        <div class="editData" v-show="showEdit">
      <h3>Modifica tus datos:</h3>
      <label for="name">Nombre:</label>
      <input type="text" v-model="newNombre" placeholder="nombre" />
      <label for="name">Apellidos:</label>
      <input type="text" v-model="newApellidos" placeholder="apellidos" />
      <label for="name">Nickname:</label>
      <input type="text" v-model="newNickname" placeholder="nickname" />
      <br />
      <button @click="updateUser()">Update</button>
   
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
          showIdeas(index) {
      this.showIdea = true;
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
.main {
  width: 100%;
  background-image: url(../assets/backla.png);
    background-repeat: no-repeat;
    background-size: 1700px 950px;
    height: 950px;
    color: black;
}


button{
    padding: 0.7rem;
    background: rgb(61, 150, 223);
    color: black;
    font-size: 1rem;
     margin: 1.5rem;
}
h2{
    color: rgb(0, 101, 216);
  
}

.editData {
  margin: 1rem;
  background: white;
  width: 60%;
  margin-left: 20rem;
  padding: 1rem;
}

.editData h3 {
  color:  rgb(0, 101, 216);
}
.footer{
  padding: 12rem;
}

.dataIni{
  background: white;
  width: 25%;
  padding: 1rem;
  display: inline-block;
}
input{
  margin: 0.5rem;
}
</style>

