<template>
  <div>
     <!-- Menú de la página  -->
 
  <MenuCustom> </MenuCustom>


<!-- Se aplica el cambio de nombre-->
  <vue-headful title="About"
     description=" Información sobre el Autor."/>
     <br>
     <h2> Perfil del creador web:</h2>

    <p> Hola como están,  mi nombre es Manuel Suena:</p>
      <!--Imagen   -->
<img src="../assets/fotom.png" alt="Foto del autor">

<!--Un párrafo con información  -->
 <p> Para más información, consulte mis redes sociales en los siguientes link: </p>

 <!--Link de red social  -->

 <a href="https://www.linkedin.com/in/manuel-eugenio-suena-rodríguez-79108152">linkedin MS</a>
 <a href=" https://github.com/manuelsuena"> GITHUB</a>


<!--Un párrafo con información  -->

 <p> Este proyecto se construyó con:</p>

 <!--Link de información   -->
      <a href="https://www.npmjs.com/package/jsonwebtoken">jsonwebtoken</a>
     
      <a href="https://www.npmjs.com/package/axios">AXIOS</a>

      <div class="footer">
      
      <FooterCustom>     </FooterCustom> 
      </div>
   </div>
</template>

<script>
/* Importamos los componentes que queremos utilizar en esta vista */
import MenuCustom from '@/components/MenuCustom.vue'
import FooterCustom from '@/components/FooterCustom.vue'


// Colocamos el nombre al componente para su exportacion y en data se definen las variables y tipos 
//que se van a usar
export default {
  name: 'Home',
  components: {
    MenuCustom,
    FooterCustom,
  },
      data(){
    return{
     title: 'Información del Autor'
    }
      },
}
</script>
<!--Estilo -->
<style scoped>

/*   width: 100%;
  background: cadetblue;
  color: black; */

a{
  margin: 2rem;
  padding: 1rem;
  color: rgb(101, 156, 219);
}
.footer{
  margin-top: 6rem; 
}
h2{
    color: rgb(20, 93, 177);
}
p{
  color: #242424;
}
</style>