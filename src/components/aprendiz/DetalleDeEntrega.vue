<template>
    <div class="container">
        <b-card class="m-1">
            <h2>Entregas del proyecto {{ proyecto.nombre_proyecto }} </h2>
            <div class="row">
                <p class="fw-lighter">Descripcion:</p>
                <p>{{ entrega.descripcion_entrega }}</p>
                <p><span class="fw-lighter">Estado de la entrega: </span>{{ entrega.calificacion }}</p>
            </div>
            <div class="row">
                <p><span class="fw-lighter">Tipo De Revision: </span>{{ tipo_revision }}</p>
            </div>
            <div class="row">
                <p><span class="fw-lighter">Nota del Instructor: </span>{{ entrega.respuesta_instructor }}</p>
            </div>
        </b-card>
    </div>
</template>
<script>
import axios from 'axios'
export default{
    data(){
        return{
            proyecto:null,
            usuario:null,
            entrega:{
                id:null,
          calificacion: null,
          descripcion_entrega: null,
          respuesta_instructor: null,
          instructor: null,
          proyecto: null,
          tipo_revision: null,
          autor: null

        },
        tipo_revision:null
        }
    },
    methods:{
        async getProyecto(id){
            await this.axios('api/proyecto/'+id+'/').then(response=>{
                this.proyecto = response.data

            })
        },
        async getEntrega(){
            let id = this.$route.params.id
            await axios.get('api/entrega/'+id+'/').then(response=>{
                this.entrega.id = response.data.id,
                this.entrega.calificacion= response.data.calificacion,
                this.entrega.descripcion_entrega= response.data.descripcion_entrega,
                this.entrega.respuesta_instructor= response.data.respuesta_instructor,
                this.entrega.instructor= response.data.instructor,
                this.entrega.proyecto= response.data.proyecto,
                this.entrega.tipo_revision= response.data.tipo_revision,
                this.entrega.autor= response.data.autor
            })
        },
        async getTipoDeRevision(id){
            await axios.get('api/tipo_revision/'+id+'/').then(response=>{
                this.tipo_revision=response.data.nombre
            })
        }
    },
    async mounted(){
        await this.getEntrega()
        await this.getTipoDeRevision(this.entrega.tipo_revision)
        await this.getProyecto(this.entrega.proyecto)

    }

}
</script>