<template> 
    <div class="p-3 text-center">
      <h1>Lista del Grupo{{ id }}</h1>
      <div class="container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Ficha</th>
              <th scope="col">Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(inscrito, index) in inscritos" :key="index">
              <td>{{ inscrito.perfil  }}</td>
              <td>{{ inscrito.ficha }}</td>
              <button @click="eliminar(inscrito.id)" class="btn btn-outline-danger" >x</button>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn btn-outline-success" @click="agregarMiembro">Agregar Miembro</button>
      <button class="btn btn-outline-danger" @click="cancelar">Cancelar</button>
      <h3> <button class="btn btn-outline-primary" @click="atras">Atras</button> </h3>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        inscritos: []
      };
    },
    created(){
      this.obtenerInscritos();
    },
    methods:{
      async obtenerInscritos(){
        const respuesta = await axios.get('http://127.0.0.1:8000/api/inscrito/')
        this.inscritos = respuesta.data;
      },
      agregarMiembro(id){
        this.$router.push('/AgregarMiembros/'+id+"/");
      },  
      cancelar() {
        this.$router.push('/CrearGrupo');
      },
      async eliminar (id){
        await axios.delete("http://127.0.0.1:8000/api/inscrito/"+id+"/")
        await this.obtenerInscritos()
      },
      atras(){
        this.$router.push('/ListaGrupos')
      }

    }
  }
  </script>
  