<template>
   <!-- Se crean los elementos del HTML -->
  <div>
    <p> {{ideaId_idea}}</p>
 <h2>{{ideaTitulo}}</h2>
 <div class="description">
   <p>Categoria: {{ideaCategoria}}</p>
   <h3> Descripción:</h3>
  <p> {{ideaDescripcion}} </p>
  </div>
 <p> <strong >visitas:</strong > {{ideaVisitas}}</p>
 <p> <strong >Rating: </strong > {{ideaRating}}</p>
  </div>
</template>

<!--Exportamos las variables y su tipo que queremos que aparezcan en la vista  -->
<script>
import Swal from "sweetalert2";
export default {
 name: 'IdeasCustom', 
 props: {
        ideaTitulo: String,
        ideaCategoria: String,
        ideaDescripcion:String,
        ideaVisitas: String,
        ideaRating: String,
        ideaId_idea:String
},

}

</script>

<style scoped>

</style>
