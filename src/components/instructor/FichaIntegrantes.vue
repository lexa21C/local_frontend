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
                <th scope="col">Nombre</th>
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
                  <div>
  <b-button v-b-modal.modal-prevent-closing>Cambiar de ficha</b-button>
  <b-modal
    id="modal-prevent-closing"
    ref="modal"
    title="Cambiar aprendiz de ficha"
    ok-title="cambiar"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label="Name"
        label-for="name-input"
        invalid-feedback="Name is required"
        :state="nameState"
      >
        <b-form-select
          id="name-input"
          v-model="name"
          :options="ficha"
          value-field="codigo"
          text-field="codigo" 
          required
        >
          <template #first>
            <b-form-select-option :value="null" disabled>-- Por favor seleccione una opción --</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
    </form>
  </b-modal>
</div>

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
   