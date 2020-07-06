<template>
   <!-- Se crean los elementos del HTML -->
  <div >
      <div class="footer">  
              <p> {{ copyright}}</p>
      </div>
    
  </div>
</template>

<!--Exportamos las variables y su tipo que queremos que aparezcan en la vista  -->
<script>
export default {
 name: 'FooterCustom',
 data(){
     return{
         copyright: 'Manuel Suena R,  2020-2020'
     }
 }
}
</script>

<!--Estilo -->
<style  scoped>


.footer{
    height: 4rem;
    background: #242424;
    font-size: 0.7rem;
    color: white;
     margin-right: -0.5rem;
 margin-left: -0.5rem;
}
.footer p{
 padding: 1.5rem;
 text-align:center;
}



</style>