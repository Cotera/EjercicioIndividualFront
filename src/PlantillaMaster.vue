<template>
<div id="master" class="center-block">
	<ul class="list-group">
		<p>Seleccione una plantilla para editarla o cree una nueva.</p>
		<p><input type="button" name="crear" value="Nueva Plantilla" class="btn btn-secondary" v-on:click = "showDetail"/></p>
		<a href="#" class="list-group-item row col-md-4" v-for= "plantilla in plantillas" v-on:click= "showDetail" id="plantilla.Id" v-bind:id = "plantilla.Id">{{plantilla.Tipo}}</a>
	</ul> 
	<div id="detail"></div>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import PlantillaDetail from './PlantillaDetail.vue'
import {EventBus} from './EventBus.js'
export default{
	name: 'master',
	data () {
		return {
			plantillas: null
		}
	},
	created(){
		this.getAll()
		EventBus.$on('cambiosPlantilla',
			this.getAll
		)
		
	},
	methods: {
		getAll: function(){
			axios.get(SERVER+'/api/Plantillas')
			.then (result => {
				this.plantillas = result.data;
			})
		},
		showDetail: function(event){
			let plantilla = this.devuelvePlantilla(event.target.id)
			new Vue({
				el: '#detail',
				data:{
					plantilla:plantilla
				},
				render: h => h(PlantillaDetail)
			})
		},
		devuelvePlantilla: function(id){
			var resultado
			this.plantillas.forEach(function(plantilla){
				if(plantilla.Id == id){
					resultado = plantilla
				}		

			})
			return resultado
		}
	}
}
</script>
