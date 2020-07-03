<template>
  <div class="main">

              <!-- Se aplica el cambio de nombre-->
            <vue-headful title="NewIdea"
         description="Página de registrar nueva idea."/>

          <!-- Menú de la página  -->
      <MenuCustom> </MenuCustom>
    
               <!--Elementos HTML  -->

                <h2> Crear nueva idea.</h2>
                <div id="contenedor">
               <div id="input">
             <p v-show="required"> tienes datos aun por rellenar </p>

               <Label for="categoria"> Categoria: </Label>
             <input type="categoria"  minlength="2" maxlength="20" name="categoria" placeholder="categoria de la idea"
             v-model="categoria">

                <Label for="titulo"> Título: </Label>
             <input type="titulo" minlength="2" maxlength="50" name="titulo" placeholder="titulo de la idea"
             v-model="titulo">

             <Label for="descripcion"> Descripción: </Label>
             <textarea id="descripcion" name="descripcion" placeholder="descripcion de la idea"
             v-model="descripcion" cols="100" rows="10"> Descripción</textarea>
            <!--  <input type="text" minlength="2" maxlength="500" name="descripcion" placeholder="descripcion de la idea"
             v-model="descripcion"> -->
              
              </div>
 
             <button @click="addIdea(categoria, titulo, descripcion)">
                Agregar
        </button>
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
import Swal from "sweetalert2";

export default {
    name: 'Newidea',
    components:{
           FooterCustom,
           MenuCustom,
       },
    data(){
        return {
            categoria:'',
            titulo:'',
            descripcion:'',
            correctData: false,
            required: false
        }
    },

    // Funcióin validar y agregar usuarios
    methods: {
        validatingData(){
          if(this.categoria=== '' || 
          this.titulo === '' ||
          this.descripcion === '' ) {
              this.correctData = false // no enviar
              this.required = true // se muestra mensaje
          } else {
              this.correctData = true // si enviar
              this.required = false // no se muestra
          }
        },
            addIdea(categoria, titulo, descripcion){
             this.validatingData() // se valida si hay datos
             if(this.correctData === true){
             var self = this
              const data = localStorage.getItem("id");
             const token = localStorage.getItem("token");
             axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
             axios.post('http://localhost:3009/ideas', {
                 categoria: self.categoria,
                 titulo: self.titulo,
                 descripcion: self.descripcion,
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
             title: 'Idea creado',
             text: "Ve a la página Mis Ideas si quieres observarla"
              })
               } else {
                Swal.fire({
                 icon: 'error',
                 title: 'Oops...',
               text: 'Faltan campos por rellenar',
                 })
                }
             },
    
        emptyFields(){
           this.categoria=''
            this.titulo=''
            this.descripcion=''
        }
        
    },
  
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
input{
    padding: 0.8rem;
    margin: 1rem;
}
label {
    font-size: 1.15rem;
    display: block;
    padding: 0,2rem;
    margin: 0,2rem;
    color: rgb(15, 15, 128);
} 
#input {
    display: block;
    margin-left: 1.5rem;
}
#contenedor {
    display: inline-block;
    width: 35%;
    padding: 2rem;
/*     border: solid black 2px; */
    margin: 1rem;
    margin-bottom: 2rem;
}
button{
    border-radius: 20%;
    padding: 1rem;
    background: rgb(0, 17, 255);
    color: white;
    margin-top: 2rem;
}
h2{
    color: rgb(25, 94, 223);
}
.footer{
    margin-top: 4rem;
}
textarea{
    margin-top: 0.7rem;
    margin-left: -10rem;
}
/* input{
    padding: 0.8rem;
    margin: 1rem;
}
label {
    padding: 1rem;
    margin: 1rem;
} 
#input {
    margin-left: 1.5rem;
}
#contenedor {
    display: inline-block;
    width: 35%;
    padding: 2rem;
    border: solid black 2px;
    background: lavenderblush;
    margin: 1rem;
    margin-bottom: 2rem;
}
button{
    padding: 0.7rem;
    background: lightcyan;
    color: black;
}
h2{
    color: blue;
} */
</style>

