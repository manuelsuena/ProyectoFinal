<template>
  <div >

              <!-- Se aplica el cambio de nombre-->
            <vue-headful title="NewIdea"
         description="Página de registrar nueva idea."/>

          <!-- Menú de la página  -->
      <MenuCustom> </MenuCustom>
    
               <!--Elementos HTML  -->

                <h2> Crea una idea o pregunta nueva.</h2>
                <div id="contenedor">
               <div id="input">
             <p v-show="required"> tienes datos aun por rellenar </p>

               <Label for="categoria"> Categoria: </Label>
             <!-- <input type="categoria"  minlength="2" maxlength="20" name="categoria" placeholder="categoria de la idea"
             v-model="categoria"> -->

             <select v-model="categoria">
                 <option> Ambiental </option>
                 <option> Educación </option>
                 <option> Finanzas </option>
                 <option> Tecnología </option>
             </select>


                <Label for="título"> Título: </Label>
             <input type="titulo" minlength="2" maxlength="50" name="titulo" placeholder="título de la idea"
             v-model="titulo">

             <Label for="descripcion"> Descripción: </Label>
             <textarea id="descripcion" name="descripcion" placeholder="Descripción de la idea"
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

    // Función validar y agregar Idea
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
             title: 'Idea creada',
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
    
     // Función dejar en blanco los input
        emptyFields(){
           this.categoria=''
            this.titulo=''
            this.descripcion=''
        }
        
    },
  
}
</script>

<style scoped>
input{
    padding: 0.8rem;
    margin: 1rem;
}
label {
    font-size: 1.15rem;
    display: block;
    padding: 0,2rem;
    margin: 0,2rem;
    color: #242424;
} 
#input {
    display: block;
    margin-left: 1.5rem;
    color: #242424;
}
#contenedor {
    display: inline-block;
    width: 70%;
    padding: 2rem;
/*     border: solid black 2px; */
    margin: 1rem;
    margin-bottom: 2rem;
     background: #f5ece5;
}
button{
    border-radius: 20%;
    padding: 1rem;
     background: rgb(101, 156, 219);
    color: white;
    margin-top: 2rem;
    border-radius: 18%;
}
h2{
    margin-top: 2rem;
    color: rgb(0, 101, 216);
}
.footer{
    margin-top: 4rem;
}
textarea{
    margin-top: 0.7rem;
   
}

</style>

