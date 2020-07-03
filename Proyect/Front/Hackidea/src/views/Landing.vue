<template>
  <div class="main">

              <!-- Se aplica el cambio de nombre-->
            <vue-headful title="Landing"
         description="Página de todas las ideas"/>

          <!-- Menú de la página  -->
      <MenuCustom> </MenuCustom>
    
      <div id="buscar">
  <label for="bySearch">Buscar por categoria: </label>
  <input
    v-model="search"
    id="search"
    name="bySearch"
    type="search"
    placeholder="Búsqueda por categoria"
  />
</div>
               <!--Elementos HTML  -->
         
   <h2 id="titulo"> Página principal de las ideas o preguntas </h2>
   <div class="ideasp" v-for="(idea, index) in filteredIdea" :key="idea.id">  
   <p id="idIdeas"> {{idea.id_idea}}</p>
   <h3> {{idea.titulo}}</h3>
   <p> <strong> Categoria: </strong>  {{idea.categoria}}</p>
   <p>  <strong> Visitas: </strong> {{idea.visita}}</p>
   <p> <strong> Rating: </strong>   {{idea.avgRating}}</p>
   <button  @click="showIdeas(index)" > ver </button>
   

      <div class="IdeaInd" v-show="showIdeaInd">

          <div class="Usuario">
              <p> <strong> Nickname: </strong>  {{user.nickname}}</p>
              <p> <strong> miembro desde: </strong> {{user.fecha_creacion}} </p>
             <button @click=" showComentar(index)"> comentar </button>
            <button @click="showVoto(index)"> votar </button>
            <button @click=" closeModal()"> atras </button>

         
        <h2> 
            {{currentIdea.titulo}}
        </h2>
        <p> <strong> Categoria: </strong> {{currentIdea.categoria}}</p>
        <p> {{currentIdea.descripcion}}</p>

           <Label for="Mensaje"> Mensaje: </Label>
           <br>
            <textarea name="mensajes" id="mensajes" cols="30" rows="3"  v-model="mensajes">Nuevo comentario:</textarea>
             <button @click="addMensaje(index)"> enviar </button>

         <h2> Comentarios: </h2>
        <div v-for="msg in msgs" :key="msg.id">  
        <p>{{msg.mensaje}}</p>
       </div>
        </div>
          </div>
           
             <div class="rating" v-show="newRating">

             <Label for="voto"> Voto: </Label>
             <input type="number" id="puntajes" name="puntajes" min="0" max="5" step="0.5" placeholder="nuevo voto"
             v-model="puntajes">
             <button @click="addVoto(index)"> enviar </button>
            </div>
     

             

          <!--    <Label for="Mensaje"> Mensaje: </Label>
             <input type="text" name="mensaje" placeholder="nuevo mensaje"
             v-model="mensajes">
             <button @click="addMensaje(index)"> enviar </button> -->
          
            
        </div>
 <FooterCustom> </FooterCustom>
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
    name: 'Landing',
    components:{
           FooterCustom,
           MenuCustom,
       },
    data(){
        return {
            ideas:[],
            currentIdea:[],
            msgs: [],
            user:[],
         
            newTitulo: '',
            newCategoria: '',
            newDescripcion: '',
            showIdeaInd: false,
            mensajes: '',
            newRating: false,
            puntajes: '',
            visita: '',
            search: '',
            selectedId: Number,
        }
    },
computed:{
  filteredIdea(){
   // Si search esta vacío
   if(!this.search){
   return this.ideas
   }
  // si search tiene algo busca por categoria.
      return this.ideas.filter(
       ideas =>
          ideas.categoria.toLowerCase().includes(this.search.toLowerCase())
      );
    },
   },
    // Funciones ver ideas
    methods: {
        getIdea() {
      const self = this;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/ideas')
        .then(function(response) {
          self.ideas = response.data.data;
          console.log(self.ideas)
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
     // mostrar modal
          showIdeas(index) {
      this.getIdeaInd(index);
      this.getComentarios(index);
      this.getUserInd(index);
      this. addVisita(index);
       this.showIdeaInd = true;
       console.log(msg)
    },
    
     // Funciones ver idea individual
      getIdeaInd(index) {
      const self = this;
       const id = self.ideas[index].id_idea;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/ideas/' + id)
        .then(function(response) {
          self.currentIdea = response.data.data;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
     // Funciones ver info del usuario de la idea
          getUserInd(index) {
      const self = this;
       const id = self.ideas[index].id_idea;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/useridea/' + id)
        .then(function(response) {
          self.user = response.data.data;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
     // Funciones ver comentarios de la idea
       getComentarios(index) {
      const self = this;
       const id = self.ideas[index].id_idea;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/user/messages/' + id)
        .then(function(response) {
          self.msgs = response.data.data;
          console.log(msgs)
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
     // Funcion ver modal voto
         showVoto(index) {
               this.newRating = true;
    }, 
   
    // Funciones votar
            addVoto(index){
             var self = this
              const user = localStorage.getItem("id");
             const token = localStorage.getItem("token");
              const id = self.ideas[index].id_idea;
             axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
             axios.post('http://localhost:3009/ideas/vote/' + id, {
               puntaje: self.puntajes,
             })
             .then(function (response){
                 console.log(response)  
                  location.reload()
             })
             .catch(function (error){
                console.log(error)
             })
             Swal.fire({
             icon: "success",
             title: 'Mensaje creado',
             text: "Ya puedes ver el nuevo mensaje que realizaste"
              })
             },
             
        emptyFields(){
           this.newMensaje=''
        },
     // Funciones agregar comentario
   
            addMensaje(index){
             var self = this
              const user = localStorage.getItem("id");
             const token = localStorage.getItem("token");
              const id = self.ideas[index].id_idea;
             axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
             axios.post('http://localhost:3009/user/message/' + id, {
                 mensaje: self.mensajes,
                  /* id_usuario: self.user, */
             })
             .then(function (response){
                 self.emptyFields() //vaciar campos
                 console.log(response)  
                  location.reload()
             })
             .catch(function (error){
                console.log(error)
             })
             Swal.fire({
             icon: "success",
             title: 'Mensaje creado',
             text: "Ya puedes ver el nuevo mensaje que realizaste"
              })
             },
             // Funciones agregar visita
             addVisita(index){
             var self = this
              const user = localStorage.getItem("id");
             const token = localStorage.getItem("token");
              const id = self.ideas[index].id_idea;
             axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
             axios.post('http://localhost:3009/ideas/visit/' + id, {
                 visita: self.visita,
                  /* id_usuario: self.user, */
             })
             .then(function (response){
                 self.emptyFields() //vaciar campos
                 console.log(response)  
             })
             .catch(function (error){
                console.log(error)
             })
             },
    
    
        emptyFields(){
           this.newMensaje=''
        },
         // Funciones cerrar modal
        closeModal(){
               this.showIdeaInd = false;
        }
    },
     // Para crear las ideas
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
    background-size: 1700px 950px;
    height: 950px;
}
#titulo{
    margin: 1rem;
    padding: 1rem;
    color: black;
}
.ideasp {
   width: 25%;
  height: 20rem;
  display: inline-table;
 /*  border: solid black 2px; */
  margin: 1rem;
  padding: 0.3rem;
  color: black;
  background-color: white;
}
 
button{
    padding: 0.5rem;
     background: rgb(101, 156, 219);
     border-radius: 20%;
    color: rgb(255, 255, 255);
    margin: 1rem;
    font-size: 1rem;
}
#idIdeas{
  color: transparent;
}


</style>
