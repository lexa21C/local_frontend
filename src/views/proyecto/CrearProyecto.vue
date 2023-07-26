<template>
  <div class="container">
    <div class="row">
      <div class="row justify-content-center">
        <h1 class="text-center">Crear un proyecto del grupo {{ grupo[0].nombre_grupo.nombre_grupo }}  </h1>
      </div>

    </div>
    <div class="row">
      <div class="row justify-content-center">
        <h3 class="text-center">Ficha:{{grupo[0].ficha.codigo  }} </h3>
      </div>

    </div>
    <div class="row">

      <div class="d-flex justify-content-center">
    
        <b-card class="m-1 p-1"  style="width: 75%;">
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
                v-model="proyecto.foto"
                accept="image/*"
              ></b-form-file>
            </b-form-group>
           
            <b-form-group
              id="codigo_fuente"
              label="Repositorio en GitHub: "
              label-for="codigo_fuente"
            >
              <b-form-input
                id="codigo_fuente"
                v-model="proyecto.codigo_fuente"
                type="url"
              ></b-form-input>
            </b-form-group>
            <b-form-group 
              label="categorias:"
            >
            <b-dropdown text="Seleccionar categoria">
              <b-form-checkbox-group v-model="proyecto.categorias" v-for="item in categorias" :key="item.id" >
                <b-form-checkbox  :value="item.url">
                  {{ item.nombre }}
                </b-form-checkbox>
              </b-form-checkbox-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item >Seleccionar</b-dropdown-item>
            </b-dropdown>
            </b-form-group>
          </b-form>
          <div class="row m-1">
            <div>
              <b-button  @click="listaProyecto()" type="reset" variant="danger">Cancelar</b-button>
              <b-button  @click="postProyecto()" variant="success" class="enviar">Enviar</b-button>
            </div>
     
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        perfil: this.$store.state.perfil.id,
        proyecto: { 
          nombre_proyecto:null,
          descripcion:null,
          foto: null,
          aprendiz:null,
          codigo_fuente:null,
          categorias: [],
          autor: null,
        },
        categorias: [],
        grupo:null,

   

      }
    },
    methods: {
      async getCategoria(){
            await this.axios('api/categoria/').then(response=>{
                this.categorias = response.data
                
            })
        },
      async getGrupo(id){
            await this.axios('api/grupo-proyecto/'+id+'/').then(response=>{
                this.grupo = response.data
                
            })
            console.log(this.grupo)
        },
      async postProyecto(){
        this.proyecto.autor=this.perfil
        this.proyecto.aprendiz=this.grupo[0].id
        try {
      // Envía los datos a tu servicio en Django utilizando Axios
      // Aquí debes reemplazar 'URL_DEL_SERVICIO' con la URL de tu servicio en Django
          const response =  await this.axios.post('api/proyecto/', this.proyecto, {
          headers: {
            'Content-Type': 'multipart/form-data', // Aseguramos que el encabezado esté configurado correctamente
          },
        });
          // Aquí puedes manejar la respuesta del servicio, mostrar un mensaje de éxito, etc.
          let id_proyecto= response.data.id
          this.verProyecto(id_proyecto)
        } catch (error) {
      // Manejo de errores en caso de que falle la solicitud
          console.error('Error:', error.response.data);
        }
       
        
      },
      async verProyecto(id){
        this.$router.push('/detalle-proyecto/'+id)
      },
      listaProyecto(){
        this.$router.push('/lista-proyecto')
      }
    },
    async mounted(){
        await this.getCategoria()
        await this.getGrupo(this.perfil)

        
        
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