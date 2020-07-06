<template>
  <div>

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
     

   <button  @click="showIdeas(index)" v-show="checkLogin()"> ver </button>
   
     </div>
      <div class="modal" v-show="showIdeaInd">
        <div class="modalBox">
          
           <button class="closeModal" @click="closeModal()"> Cerrar </button>
           
          <div class="usuario">
              <p> <strong> Nickname: </strong>  {{user.nickname}}</p>
             <p> <strong> miembro desde: </strong> {{user.fecha_creacion}} </p>

              </div>
          
                           
          <div class="ideaBox">
        <h2> 
            {{currentIdea.titulo}}
        </h2>
        <p> <strong> Categoria: </strong> {{currentIdea.categoria}}</p>
        <p> {{currentIdea.descripcion}}</p>
          </div>

          <div class="mensajeBox"> 

           <Label for="Mensaje"> Mensaje: </Label>
    

            <textarea name="mensajes" id="mensajes" cols="100" rows="10"  v-model="mensajes">Nuevo comentario:</textarea>
            <br>
             <button @click="addMensaje(index)"> enviar </button>

                    <div class="votacion"> 
             <Label for="voto"> Voto: </Label>
             <input type="number" id="puntajes" name="puntajes" min="0" max="5" step="0.5" placeholder="nuevo voto"
             v-model="puntajes">
             <button @click="addVoto(index)"> enviar </button>
            </div> 
            

         <h2> Comentarios: </h2>
        <div class="coment" v-for="msg in msgs" :key="msg.id"> 
            <p> <strong> Fecha: </strong> {{msg.mensaje_fecha}}
        </p> 
        <p> {{msg.mensaje}}</p>

        </div>
       </div>
      
          </div>

            
     </div>

             
    <div class="footer">
       <FooterCustom> </FooterCustom>
    </div>
            
       

  </div>
</template>

<script>
/* Importamos los componentes que queremos utilizar en esta vista */
import { isLoggedIn } from "../api/utils";
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
            visita: '',
            search: '',
            selectedId: Number,
            index: '',
            puntajes:0,
           
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
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
     // mostrar modal
    
          showIdeas(index) {
            this.index = index;
      this.getIdeaInd(index);
      this.getComentarios(index);
      this.getUserInd(index);
      this. addVisita(index);
       this.showIdeaInd = true;
      
    },
    checkLogin() {
      return isLoggedIn();
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
       console.log(id);
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
         
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },

/*      // Funcion ver modal voto
         showVoto(index) {
               this.newRating = true;
    },  */
   
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

#titulo{
    margin: 4.5rem;
    padding: 1rem;
    color: rgb(20, 93, 177);
}
.ideasp {
   width: 25%;
  height: 20rem;
  display: inline-table;
 /*  border: solid black 2px; */
  margin: 2rem;
  padding: 0.3rem;
  color: black;
  background-color: white;
  margin-top: -2rem;
  background: #fffaf6;

}
 
button{
    padding: 0.5rem;
       background: rgb(101, 156, 219);
    color: white;
     border-radius: 20%;
    margin: 1rem;
    font-size: 1rem;
    border-radius: 18%;
}
#idIdeas{
  color: transparent;
}
.coment{
  width: 100%;
  border: 1px solid black;
  padding: 0.5rem;
  margin: 1rem;
  display: block;
}
.coment p {
  display: grid-row 2;
  
}
#buscar{
  position: absolute;
  color: #242424;
  margin: 2rem;
}
.footer{
  margin-top: 3rem;
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
}
.modalBox {
  overflow-y: auto;
  background: #fefefe;
  margin: 2rem auto;
  padding: 20px;
  border: 1px solid #888;
  width: 90%;
  height: 700px;
}
.usuario{
  width: 15%;
  border: 1px solid black;
     position: absolute;
    top: 75%;
    left: 60%;
     transform: translate(120%,-440%); 

}
.ideaBox {
  position: relative;
  background: #fffaf6;
    width: 70%;
   margin-bottom: 3rem;
   margin-top: 2rem;
   margin-left: 6rem;
   padding: 1rem;
   text-align: center;
}

.mensajeBox{
  width: 80%;
  margin-left: 4rem;
}
 .closeModal  {
    margin-left: 70rem;
}

.votacion {
    position: absolute;
    top: 40%;
    left: 80%;
}
</style>