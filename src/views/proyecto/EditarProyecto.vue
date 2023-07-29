<template>
  <div class="container">
    <div class="row">
      <div class="row justify-content-center">
        <h1 class="text-center">Actualizar el proyecto del grupo {{ grupo[0].nombre_grupo.nombre_grupo }}  </h1>
      </div>

    </div>
    <div class="row">
      <div class="row justify-content-center">
        <h3 class="text-center">Ficha:{{grupo[0].ficha.codigo  }} </h3>
      </div>

    </div>
    <div class="row">

      <div >
  
        <b-card class="m-2 p-3"  >
          
          <!-- Contenido de la tarjeta -->
          <b-form>
            <b-form-group 
              id="input-group-1"
              label="Nombre del proyecto:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="proyecto.nombre_proyecto"
                type="text"
                required
              >    
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="descripcion"
              label="Descripción del proyecto:"
              label-for="descripcion"
            >
              <b-form-textarea
                id="descripcion"
                v-model="proyecto.descripcion"
                :rows="5"
                required
              ></b-form-textarea>
            </b-form-group>
            
            <b-form-group
              id="foto"
              label="Logo de la App:"
              label-for="foto"
            >
              <b-form-file
                id="foto"
                v-model="foto"
                accept="image/*"
              ></b-form-file>
            </b-form-group>
            <b-form-group
              id="codigo_fuente"
              label="Código fuente del proyecto:"
              label-for="codigo_fuente"
            >
              <b-form-input
                id="codigo_fuente"
                v-model="proyecto.codigo_fuente"
                type="url"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="categorias:">
            <b-dropdown text="Seleccionar categoría">
              <b-form-checkbox-group
                v-model="proyecto.categorias"
                v-for="item in categorias"
                :key="item.id"
              >
                <b-form-checkbox :value="item.id">{{ item.nombre }}</b-form-checkbox>
              </b-form-checkbox-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item>Seleccionar</b-dropdown-item>
            </b-dropdown>
          </b-form-group>
          
            <b-button class="m-1" type="reset" variant="danger" @click="detalleProyecto(proyecto.id)">Cancelar</b-button>
            <b-button class="m-1 enviar" @click="editarProyecto(proyecto.id)" >Enviar</b-button>
          </b-form>
          <div class="mt-3">Selected: <strong>{{this.proyecto}}</strong></div>
        </b-card>
      </div>
    </div>
  </div>
  </template>
  
  
  
  <script>
  import axios from 'axios'
    export default {
      data() {
        return {
          perfil: this.$store.state.perfil.id,
          grupoSelecionado:null,
          foto:null,
          grupo:null,
          proyecto: {
            id:null,
            nombre_proyecto: null,
            descripcion: null,
            aprendiz:null,
            foto: null,
            codigo_fuente: null,
            categorias: [],
          },

          categorias: [],
          show: true,
  
        }
      },
      methods: {
        async verProyecto (){
        let id = this.$route.params.id
        await axios.get("api/proyecto/"+id+"/").then(response=>{
            this.proyecto.id=response.data.id
            this.proyecto.nombre_proyecto=response.data.nombre_proyecto
            this.proyecto.descripcion=response.data.descripcion
            this.proyecto.foto=response.data.foto
            this.proyecto.codigo_fuente=response.data.codigo_fuente
            this.proyecto.categorias=response.data.categorias

            });
        } ,
        async getCategoria(){
              await this.axios('api/categoria/').then(response=>{
                  this.categorias = response.data
                  
              })
        },
        async detalleProyecto(id){
          this.$router.push('/detalle-proyecto/'+id)
        },
        async editarProyecto(id){
          this.proyecto.autor=this.perfil
          this.proyecto.foto=this.foto
          this.proyecto.aprendiz=this.grupo[0].id
          console.log(this.proyecto.categorias)
          try {

            await this.axios.put('api/proyecto/'+id+'/', this.proyecto, {
            headers: {
              'Content-Type': 'multipart/form-data', // Aseguramos que el encabezado esté configurado correctamente
            },
          });
          
  

          } catch (error) {
       
            console.error('Error:', error.response.data);
          }
       
        
      },

        async getGrupo(id){
          
            await this.axios('api/grupo-proyecto/'+id+'/').then(response=>{
                this.grupo = response.data
                
            })
            console.log(this.grupo)
        },
        async guardaFoto(url) {
      if (url) {
        try {
          console.log('Descargando imagen desde:', url);
          const response = await axios.get(url, {
            responseType: 'blob',
          });
          this.foto = new File([response.data], 'foto.jpg', { type: 'image/jpeg' });
          console.log('Imagen descargada exitosamente:', this.foto);
        } catch (error) {
          console.error('Error al descargar la imagen:', error);
        }
      }
    },

      },
      async mounted(){
          await this.getCategoria()
          await this.verProyecto()
          await this.getGrupo(this.perfil)
          await this.guardaFoto();
          
      }
    }
  </script>
  
   <style>
   .enviar{
    background-color: #d81e84;
   }
        /* Estilos CSS para el contenedor */
    .contenedor {
          background-color: rgba(255, 218, 185, 0.2);
        }
    </style>