<template>
  <div class="main">
     <!-- Menú de la página  -->
     <div class="menu">
  <MenuCustom> </MenuCustom>
  </div>

<!-- Se aplica el cambio de nombre-->
  <vue-headful title="About"
     description=" Información sobre el Autor."/>
     <br>
     <h2> Perfil del creador web:</h2>

    <p> Hola como están,  mi nombre es Manuel Suena:</p>
      <!--Imagen   -->
<img src="../assets/fotom.png" alt="Foto del autor">

<!--Un párrafo con información  -->
 <p> Para más información sobre el autor, consulte mis redes sociales en los siguientes link: </p>

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
  .main {
  width: 100%;
  background-image: url(../assets/about.png);
    background-repeat: no-repeat;
    background-size: 1700px 950px;
    height: 950px;
   color: white;
   text-align: center;
   font-size: 1.15rem;
}

a{
  margin: 2rem;
  padding: 1rem;
  color: rgb(125, 226, 43);
}
.footer{
  margin-left: 37rem;
    margin-top: 7rem;
    color: white;
    background: white;
    width: 20%;
}
.menu {
    margin-left: 37rem;
    color: white;
    background: white;
    width: 25%;
}
</style>