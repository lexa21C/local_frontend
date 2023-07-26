<template>
  <b-container>
    <b-row class="m-2">
      <b-col
        md="6"
        sm="12"
      >
        <h2>Registrar Usuarios</h2>
        <b-form class="">
          <b-form-group
            id="documento"
            label="Documento :"
            label-for="documento"
          >
            <b-form-file
              id="documento"
              v-model="documento"   
              accept=".xls,.xlsx"
              name="file"
            ></b-form-file>
          </b-form-group>
          <b-form-group
            label="Rol:"
          >
            <b-form-select 
              v-model="rol_id"  
              name="rol_id"
            >
              <b-form-select-option
                v-for="rol in rol"
                :key="rol.id"
                :value="rol.id"
              >
                {{ rol.nombre }}
              </b-form-select-option>
            </b-form-select>   
          </b-form-group>
          <b-form-group
            label="Ficha"
          >    
            <b-form-select 
              v-model="ficha_id" 
              name="ficha_id" 
            >
              <b-form-select-option
                v-for="ficha in ficha"
                :key="ficha.id"
                :value="ficha.id"
              >
                {{ ficha.codigo }}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-form>
        <b-button @click="uploadFile">Subir archivo</b-button>
      </b-col>
      <b-col
        md="6"
        sm="12"
      >
        <h2>Usuarios Registrados</h2>
        <b-table striped hover :items="items" :fields="fields"></b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import axios from 'axios';

export default {
  
  data() {
    return {
      fields: [
        {
          key: 'last_name',
          label: 'nombre',
        },
        {
          key: 'first_name',
          label: 'apellido',
        },
        {
          key: 'email',
          label: 'correo electronico',
          
          
        }
      ],
      items: null,
      rol: null,
      documento: null,
      ficha: null, // Replace with the actual ID of the ficha
      ficha_id: null, // Replace with the actual ID of the ficha
      rol_id: null   // We'll set this dynamically based on the selected role
    };
  },
  methods: {
    getFicha() {
      axios.get("api/ficha/").then(response => {
        this.ficha = response.data;
      });
    },
    getRol() {
      axios.get("api/rol/").then(response => {
        this.rol = response.data;
      });
    },
    uploadFile() {
      let formData = new FormData();
      formData.append('file', this.documento);
      formData.append('ficha_id', this.ficha_id);
      formData.append('rol_id', this.rol_id); // Assuming the URL is the value you need

      axios
        .post('api/upload/', formData)
        .then(response => {
          this.items = response.data
        })
     
        this.documento = null;
        this.ficha_id = null;
        this.rol_id = null;
      
        
        // Crear una nueva instancia vacía de FormData para eliminar los datos anteriores
        formData = new FormData()
        .catch(error => {
          console.error(error);
        });
    }
  },
  mounted() {
    this.getRol();
    this.getFicha()
  }
};
</script>

