<template>
  <div id="app" class="row center-block">
    <h1 id="plantilla" v-on:click="showMaster" class="col-spaced col-md-6 btn btn-secondary btn btn-md" v-bind:class="{ 'btn-success': plantillaSelected }">Plantillas</h1>
    <h1 id="tipoDoc" v-on:click="showMaster" class="col-spaced col-md-6 btn btn-secondary btn btn-md" v-bind:class="{ 'btn-success': tipoDocSelected }">Tipos de Documento</h1>
    <div id="master"></div>
  </div>
  
</template>
<script>
import Vue from 'vue'
import PlantillaMaster from './PlantillaMaster.vue'
import TipoDocMaster from './TipoDocMaster.vue'
export default {
  name: 'app',
  data(){
    return {
      plantillaSelected: false,
      tipoDocSelected: false
    }
    
  },
  methods: {
    showMaster:function(event){
      let id = event.target.id
      switch (id){
        case "plantilla":
            this.plantillaSelected=true
            new Vue({
              el: '#master',
              render: h => h(PlantillaMaster)
            })
            this.tipoDocSelected=false
          break
        case "tipoDoc":
            this.tipoDocSelected=true
            new Vue({
              el: '#master',
              render: h => h(TipoDocMaster)
            })
            this.plantillaSelected=false
          break
      }
    }
  }
}
</script>
