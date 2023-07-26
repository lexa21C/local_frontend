<template>
    <div class="container ">
      <div class="m-2">
        <h1>Proyectos creados en la ficha: {{ ficha.codigo }}</h1>
        <div class="table-responsive " v-for="item in items" :key="item.id" >
          <b-card class="m-2">
              <b-card-header>
                  {{ item.nombre_proyecto }}
              </b-card-header>
              <b-card-body>
                  <!-- <b-card-title>
                      fhfhfh
                  </b-card-title> -->
                  <b-card-text>
                      <p>Descripcion:</p>
                      {{ item.descripcion }}
                  </b-card-text>
                  <b-button  @click="verProyecto(item.id)" class="m-2 position-absolute bottom-0 end-0">
                      {{ item.calificacion }}
                  </b-button>
              </b-card-body>
          </b-card>
          
        </div>
      </div>
    </div>
</template>
<script>

import axios from 'axios'
  export default {
    props: {
      fichaId: {
        type: Number,
        required: true
      }
    },
    components: {
      
  },
    data() {
      return {
        fields: [
          { key: 'perfil.usuario.first_name', label: 'Nombre' },
          { key: 'perfil.usuario.last_name', label: 'Apellido' },
          { key: 'perfil.rol.nombre', label: 'Rol' }
        ],
        items: null,
        ficha:null,
        modalShow: false,
        
      };
    },
    methods:{
      async getFichaIntegrantes(){
        let id = this.$route.params.id
        axios.get('/api/proyectos-instructor/'+id+'/').then(response => {
          this.items = response.data
        })
      },
      async getFicha(){
        let id = this.$route.params.id
        axios.get('/api/ficha/'+id+'/').then(response => {
          this.ficha = response.data
        })
      },
      openModal() {
      this.modalShow = true;
      this.$emit('modalUpdated', true);
    },
    async verProyecto(id){
      this.$router.push('/detalle-proyecto/'+id)
    },
      
    },
    async mounted(){
      await this.getFichaIntegrantes()
      await this.getFicha()
    }
   
  }
  </script>