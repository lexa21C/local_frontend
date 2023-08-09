<template>
  <div>
    <body>
 
      <Carrusel> </Carrusel>  
      <ul>
        <Informacion> </Informacion>
      </ul>
      <ul class="ideainicio">
        <Ideas> </Ideas>
      </ul>
      <ul>
        <Informaciondos></Informaciondos>
      </ul>
  
      <imginicio></imginicio>

     </body>
    <Footer>
    </Footer>
  </div>
</template>
<script>
  
  import Footer from '../components/Footer.vue'
  import Carrusel from '../components/Carrusel.vue'
  import Informacion from '../components/Informacion.vue'
  import Ideas from '../components/Ideas.vue'
  import Informaciondos from '../components/Informacion2.vue'
  import imginicio from '../components/imginicio.vue'



  export default {

    components: {
       Footer, Carrusel, Informacion, Ideas,Informaciondos,imginicio
    }

  }
</script>

<style>
.img{
  text-align: center;
 
}





</style>

