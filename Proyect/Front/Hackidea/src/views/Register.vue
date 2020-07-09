<template>
  <div>

              <!-- Se aplica el cambio de nombre-->
            <vue-headful title="Register"
         description="Página de registro."/>

          <!-- Menú de la página  -->
      <MenuCustom> </MenuCustom>
    
               <!--Elementos HTML  -->

                <h2> Crear cuenta de usuario </h2>
                <div id="contenedor">
               <div id="input">
             <p v-show="required"> tienes datos aun por rellenar </p>

               <Label for="nombre"> Nombre: </Label>
             <input type="nombre" name="nombre" placeholder="nombre del usuario"
             v-model="nombre">

                <Label for="apellidos"> Apellidos: </Label>
             <input type="apellidos" name="apellidos" placeholder="apellidos del usuario"
             v-model="apellidos">

             <Label for="email"> Email: </Label>
             <input type="email" name="email" placeholder="email del usuario"
             v-model="email">
              <br>
              </div>
              <div>
            <Label for="password"> Password: </Label>
             <input type="password" name="password" placeholder="contraseña del usuario"
             v-model="contrasena">
                <Label for="nickname"> Nickname: </Label>
             <input type="nickname" name="nickname" placeholder="nickname del usuario"
             v-model="nickname">

         </div>
          <div>
            <button @click="addUsuario(nombre, apellidos, email, contrasena, nickname)">
            Crear
        </button>
          </div>
        </div>
          
 <FooterCustom> </FooterCustom>
      </div>
</template>

<script>
/* Importamos los componentes que queremos utilizar en esta vista */
import MenuCustom from '@/components/MenuCustom.vue'
import FooterCustom from '@/components/FooterCustom.vue'
import axios from 'axios'
import Swal from "sweetalert2";

export default {
    name: 'Register',
    components:{
           FooterCustom,
           MenuCustom,
       },
    data(){
        return {
            nombre:'',
            apellidos:'',
            email:'',
            contrasena:'',
            nickname:'',
            correctData: false,
            required: false
        }
    },

    // Funcióin validar y agregar usuarios
    methods: {
        validatingData(){
          if(this.email === '' || 
          this.contrasena === '' ||
          this.nombre === '' ||
          this.apellidos === '' ||
          this.nickname === '') {
              this.correctData = false // no enviar
              this.required = true // se muestra mensaje
          } else {
              this.correctData = true // si enviar
              this.required = false // no se muestra
          }
        },
        addUsuario(email, contrasena, nombre, apellidos, nickname){
             this.validatingData() // se valida si hay datos
             if(this.correctData === true){
             var self = this
             axios.post('http://localhost:3009/user', {
                 email: self.email,
                 contrasena: self.contrasena,
                 nombre: self.nombre,
                 apellidos: self.apellidos,
                 nickname: self.nickname,
             })
             .then(function (response){
                 self.emptyFields() //vaciar campos
                 console.log(response)  
             })

             .catch(function (error){
                console.log(error)
             })

             Swal.fire({
             icon: "success",
             title: 'Usuario creado',
             text: "Valida la cuenta para ingresar a la página "
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
            this.email = ''
            this.contrasena = ''
            this.nombre = ''
            this.apellidos = ''
            this.nickname = ''
        }
        
    },
  
}
</script>

<style scoped>

input{
    padding: 0.8rem;
    margin: 1rem;
    border-radius:3px;
     border: solid black 2px; 
}
label {
    display: block;
    font-size: 1.15rem;
    padding: 0,2rem;
    margin: 0,2rem;
    color: #242424;
} 
#input {
     display: block;
    margin-left: 1.5rem;
}
#contenedor {
    background: #f5ece5;
     display: inline-block;
    width: 30%;
    padding: 2rem;
/*     border: solid black 2px; */
    margin: 1rem;
    margin-bottom: 2rem;
}
button{
    
    padding: 0.5rem;
    background: rgb(101, 156, 219);
    color: white;
    font-size: 1rem;
    border-radius: 18%;
    margin-top: 1rem;

}
h2{
    color: rgb(20, 93, 177);
}
</style>

