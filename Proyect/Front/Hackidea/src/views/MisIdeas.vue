<template>
  <div class="main">

              <!-- Se aplica el cambio de nombre-->
            <vue-headful title="Mis Ideas"
         description="Página ideas del usuario."/>

          <!-- Menú de la página  -->
      <MenuCustom> </MenuCustom>
    
      
               <!--Elementos HTML  -->
   <h2> Mis Ideas  </h2>

  
  
    <div class="ideas"   v-for="(idea, index) in ideas" :key="idea.id">  

   <p class="id">{{idea.id_idea}}</p>
   <h3> {{idea.titulo}}</h3>
   <p> <strong> Categoria: </strong> {{idea.categoria}}</p>
   <p> {{idea.descripcion}}</p> 
<!--         <button @click="showEditUser(index, ideas[0])"> modificar</button>
       <button @click="deleteIdea(index)"> Eliminar </button>  -->


            <button @click="showEditIdea(index)"> modificar</button>
       <button @click="deleteIdea(index)"> Eliminar </button> 
           </div> 

      <div class="modal" v-show="showEdit">
      <h3>Modifica tu idea:</h3>
      <label for="name">Título:</label>
      <input type="text" v-model="newTitulo" placeholder="título" />
      <label for="name">Categoria:</label>
      <input type="text" v-model="newCategoria" placeholder="categoria" />
      <label for="name">Descripción:</label>
      <textarea type="text" name="newDescripcion" id="" cols="35" rows="15" v-model="newDescripcion"> Descripción</textarea>
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
            index:'',
            
          
        }
    },
    // Función mostrar ideas del usuario
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

      // Función abrir modal

       
        showEditIdea(index){
        this.index = index;
      this.showEdit = true;
      this.newTitulo = this.ideas[index].titulo;
      this.newCategoria = this.ideas[index].categoria;
      this.newDescripcion = this.ideas[index].descripcion; 
    },
     // Función modificar ideas del usuario

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

         // Función cerrar modal
        closeModal(){
          this.showEdit = false;
        },

         // Función eliminar ideas del usuario

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

.ideas{
  width: 30%;
  display: inline-table;
 /*  border: solid black 2px; */
  margin: 1rem;
  padding: 0.3rem;
  color: black;
  background-color: white;
  margin-top: -1rem;
  background: #fffaf6;
}
button{
    padding: 0.7rem;
     background: rgb(101, 156, 219);
     border-radius: 15%;
    color: white;
    margin: 1rem;
    font-size: 1rem;
    border-radius: 18%;
}
h2{
    color: rgb(20, 93, 177);
    font-size: 2.25rem;
    margin-top: 3rem;
}
.id{
  color: transparent;
  margin-bottom: -1rem;
}
.footer{
 margin-top: 7rem;
}
h3{
  font-size: 1.35rem;
}
.modal h3 {
  font-size: 1.55rem;
  color:rgb(20, 93, 177);
}
label {
  margin: 1rem;
  color: #242424;
}
.modal {
   margin-top: -20rem;
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
@keyframes animatetop {
   from {top:-800px; opacity: 0}
  to {top: 0; opacity: 1} 

}
.modal button {
  background: rgb(101, 156, 219);
  margin-top: 3rem;
  margin-right: 5rem;
  color: white;
  border-radius: 18%;
}


</style>