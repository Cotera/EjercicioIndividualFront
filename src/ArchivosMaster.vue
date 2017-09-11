<template>
<div id="master" class="row">
<div class="col-md-12">
	<div class="row">
		<h3>Gestión de los archivos multimedia</h3>
	</div>
	
	<div class="row">
		<div class="col-md-12">
		<input type="button" name="crear" value="Subir Archivo" class="btn btn-info"
			v-on:click = "showDetail"/>
<!--		<p>Seleccione una plantilla para editarla o cree una nueva.</p>-->
		</div>
	</div>

	<div class="row">
		<div class="col-md-12">
			<ul class="list-group">
				<a href="#" class="list-group-item row col-md-4" v-for= "archivo in archivos"
					v-on:click= "showDetail" id="archivo.Id" v-bind:id = "archivo.Id">
					{{plantilla.Tipo}}
				</a>
			</ul>
		</div>
	</div>
	
	<div id="detail" class="row">
	</div>
</div>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import ArchivosDetail from './ArchivosDetail.vue'
import {EventBus} from './EventBus.js'
export default{
	name: 'master',
	data () {
		return {
//			archivos: null
			archivos: []
		}
	},
	created(){
		this.getAll()
		EventBus.$on('cambiosArchivo',
			this.getAll
		)
		
	},
	methods: {
		getAll: function(){
			axios.get(SERVER+'/api/Archivos')
			.then (result => {
				this.archivos = result.data;
			})
		},
		showDetail: function(event){
			let plantilla = this.devuelveArchivo(event.target.id)
			new Vue({
				el: '#detail',
				data:{
					plantilla:plantilla
				},
				render: h => h(ArchivosDetail)
			})
		},
		devuelveArchivo: function(id){
			var resultado
			this.archivos.forEach(function(plantilla){
				if(plantilla.Id == id){
					resultado = plantilla
				}		

			})
			return resultado
		}
	}
}
</script>
