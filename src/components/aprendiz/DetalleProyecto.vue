<template>
    <div>
        <div class="container">
            <b-card class="m-2">
                <div class="row">
                    <div class="col-lg-8">
                        <h1>{{ proyecto.nombre_proyecto }}</h1>
                        <p><span class="fw-lighter">Estado: </span>{{ proyecto.estado }}</p>
                        <p class="fw-lighter">Descripcion:</p>
                        <p>{{ proyecto.descripcion }}</p>
                        <p class="fw-lighter">Repositorio en GitHub:</p>
                        <b-link :href="proyecto.codigo_fuente">{{ proyecto.codigo_fuente }}</b-link>
                        <p class="fw-lighter">Categorías:</p>
                        <ul>
                          <li v-for="categoria in categoria" :key="categoria.id">{{ categoria}}</li>                          
                        </ul>
                    </div>
                     <div class="col-lg-4">

                        <b-img class="imagen" :src="proyecto.foto" :alt="proyecto.nombre_proyecto"></b-img>
                    </div>
                </div>
                <div class="row">
                    <div class="text-end mt-3 m-2">
                        <b-button class="m-1  mr-2" @click="editarProyecto(proyecto.id)" variant="warning">
                            <b-icon  icon="pencil"></b-icon> 
                        </b-button>
                        <b-button class="m-1 " @click="eliminarProyecto(entrega)" variant="danger">
                            <b-icon icon="trash"></b-icon>
                        </b-button>
                    </div>
                </div>
                {{ proyecto.foto }}
            </b-card>
      </div>
    </div>
  </template>
  
<script>
import axios from 'axios'

export default{
    name:'Lista',

    data(){
        return{
            categoria:[],
            proyecto: null
            ,
        }
    },
    
    methods:{
        idCategoria(categoria){
            for (let i = 0; i < categoria.length; i++) {
                this.getCategoria(categoria[i])
              console.log(`ID: ${categoria[i]}`);
            }
        },

        getCategoria(categorias_id){
            axios.get('api/categoria/'+categorias_id+'/').then(response=>{
                let categoria=response.data.nombre
                this.categoria.push(categoria)
            })

         },
        async verProyecto (){
        let id = this.$route.params.id
        await axios.get("api/proyecto/"+id+"/").then(response=>{
            this.proyecto=response.data
            });
            this.idCategoria(this.proyecto.categorias)
        },
        editarProyecto(id){
            console.log(id)
            this.$router.push('/editar-proyecto/'+id)
        },
           
    },
    async mounted(){
        await this.verProyecto()
    }
}
</script>
