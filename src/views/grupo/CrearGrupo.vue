<template>
  <div v-if="$store.state.user.isAuthenticated">
    <h1>Agregar Grupo</h1>
    <div class="container">
      <form @submit.prevent="crearGrupo">
        <div>
          <label for="nombre_grupo">Nombre:</label>
          <input type="text" class="form-control" id="nombre_grupo" v-model="grupo.nombre_grupo">
          <b-alert v-if="showAlert" show variant="danger">{{ alertMessage }}</b-alert>
        </div>
        <button type="submit" class="btn btn-outline-primary">Agregar Grupo</button>
        <b-spinner v-if="showSpinner" variant="success" label="Creando Grupo"></b-spinner>
        <button class="btn btn-outline-success" @click="verGrupos">Ver Grupos</button>
        <button class="btn btn-outline-danger" @click="cancelar">Cancelar</button>
      </form>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      grupo: {
        nombre_grupo: '',
      },
      showAlert: false,
      alertMessage: "",
      showSpinner: false
    };
  },
  computed: {
    ...mapState(['perfil']),
    perfilLogueado() {
      const idlogueado = this.perfil.id
      return idlogueado
    }
  },
  created(){
    console.log(this.perfilLogueado)
  },
  methods: {
    crearGrupo() {
      if (!this.grupo.nombre_grupo) {
        this.showAlert = true;
        this.alertMessage = "Ingrese un nombre válido";
        return;
      }

      this.showSpinner = true;

      axios.post('api/grupo/', this.grupo)
        .then(response => {
          console.log(response.data);
          this.$router.push('/lista-grupos');
        })
        .catch(error => {
          console.log(error.response.data);
        })
        .finally(() => {
          this.showSpinner = false;
        });
    },
    verGrupos(){
        this.$router.push('/lista-grupos')
    },
    cancelar(){
        this.$router.push('/inicio')
    }
  },
};
</script>
  
  