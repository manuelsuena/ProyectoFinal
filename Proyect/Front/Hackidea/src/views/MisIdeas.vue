<template>
  <div class="main">

              <!-- Se aplica el cambio de nombre-->
            <vue-headful title="Mis Ideas"
         description="Página ideas del usuario."/>

          <!-- Menú de la página  -->
      <MenuCustom> </MenuCustom>
    
      
               <!--Elementos HTML  -->
   <h2> Mis Ideas  </h2>
<!--      <ul class="ideas" v-for="(idea, index) in ideas" :key="idea.id">
       <li>
   <p class="id">{{idea.id_idea}}</p>
   <h3> {{idea.titulo}}</h3>
   <p> <strong> Categoria: </strong> {{idea.categoria}}</p>
   <p> {{idea.descripcion}}</p>
       <button @click="showEditUser(index)"> modificar</button>
       <button @click="deleteIdea(index)"> Eliminar </button>  -->
  
  
    <div class="ideas"   v-for="(idea, index) in ideas" :key="idea.id">  

   <p class="id">{{idea.id_idea}}</p>
   <h3> {{idea.titulo}}</h3>
   <p> <strong> Categoria: </strong> {{idea.categoria}}</p>
   <p> {{idea.descripcion}}</p> 
<!--         <button @click="showEditUser(index, ideas[0])"> modificar</button>
       <button @click="deleteIdea(index)"> Eliminar </button>  -->


            <button @click="showEditUser(index)"> modificar</button>
       <button @click="deleteIdea(index)"> Eliminar </button> 
           </div> 

      <div class="editData" v-show="showEdit">
      <p>Modifica tus ideas</p>
      <label for="name">Titulo:</label>
      <input type="text" v-model="newTitulo" placeholder="titulo" />
      <label for="name">Categoria:</label>
      <input type="text" v-model="newCategoria" placeholder="categoria" />
      <label for="name">Descripcion:</label>
      <textarea type="text" name="newDescripcion" id="" cols="30" rows="10" v-model="newDescripcion"> Descripción</textarea>
      <br>
  
         <button @click="updateIdea(index)">Update</button>
      <button @click=" closeModal()"> cerrar </button>
        

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
    name: 'MisIdeas',
    components:{
           FooterCustom,
           MenuCustom,
       },
    data(){
        return {
            ideas:[],
            id: null,
            index: null,
            id_idea:null,
         
            showEdit: false,
            newTitulo: '',
            newCategoria: '',
            newDescripcion: '',
            showIdea: true,
            index:'',
            
           /*  showInicio:true, */
        }
    },
    // Funcióin validar y agregar usuarios
    methods: {
        getIdea() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/informacion/'+ data)
        .then(function(response) {
          self.ideas = response.data.data;
          console.log(self.ideas[0].id_idea)
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
          showIdeas(index) {
      this.showIdea = true;
    },
        showEditUser(index){
        this.index = index;
      this.showEdit = true;
      this.newTitulo = this.ideas[index].titulo;
      this.newCategoria = this.ideas[index].categoria;
      this.newDescripcion = this.ideas[index].descripcion; 
    },
        updateIdea(index) {
      const self = this;
      const data = self.ideas[index].id_idea;
       console.log(data)
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put('http://localhost:3009/ideas/' + data, {
         titulo: self.newTitulo,
          categoria: self.newCategoria,
          descripcion: self.newDescripcion,
        })
        .then(function(response) {
             location.reload()
             self.showEdit = false;
            
        })
          .catch(function (error){
                console.log(error)
             })
              Swal.fire({
             icon: "success",
             title: 'Idea modificada',
             text: "Ya puedes ver la modificación de tu idea."
              })
        },
        closeModal(){
          this.showEdit = false;
        },
        deleteIdea(index) {
       const self = this;
      const data = self.ideas[index].id_idea;
      axios.delete('http://localhost:3009/ideas/del/' + data)
          
        .then(function(response) {
            location.reload()
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        })
         Swal.fire({
        icon: "success",
        title: 'Idea eliminada',
        text: "Haz borrado la idea",
         })
        },
    },
      created(){
    this.getIdea();
}
}
</script>

<style scoped>
.main {
  width: 100%;
  background-image: url(../assets/backla.png);
    background-repeat: no-repeat;
    background-size: 1700px 1200px;
    height: 1200px;
}
.ideas{
  width: 30%;
  height: 20rem;
  display: inline-table;
 /*  border: solid black 2px; */
  margin: 1rem;
  padding: 0.3rem;
  color: black;
  background-color: white;
}
button{
    padding: 0.7rem;
     background: rgb(101, 156, 219);
     border-radius: 15%;
    color: rgb(255, 255, 255);
    margin: 1rem;
    font-size: 1rem;
}
h2{
    color: rgb(58, 85, 160);
    font-size: 2.25rem;
}
.id{
  color: transparent;
  margin-bottom: -1rem;
}
.footer{
  padding: 3rem;
}
h3{
  font-size: 1.35rem;
}
li {
  list-style:none;
}
</style>