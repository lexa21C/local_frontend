<template>
    <div class="container">
      <div class="row m-1">
        <h1>Ficha:{{ ficha.codigo }} </h1>
      </div>

      <div class="row">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Rol</th>
                <th scope="col">Acciones</th>

              </tr>
            </thead>
            <tbody v-for="item in items" :key="item.id">
              <tr>
                <td>{{ item.perfil.usuario.first_name }}</td>
                <td>{{ item.perfil.usuario.last_name }}</td>
                <td>{{ item.perfil.rol.nombre}} </td>
                <td>
                  <b-button @click="detalleEntrega(entrega.id)" variant="primary" class="m-1">
                  Cambiar de Ficha
                  </b-button>
                  
                </td>
              </tr>
            </tbody>
          </table>
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
        axios.get('/api/fichas-integrantes/'+id+'/').then(response => {
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
      
    },
    async mounted(){
      await this.getFichaIntegrantes()
      await this.getFicha()
    }
   
  }
  </script>
   