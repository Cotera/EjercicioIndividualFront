<template>
<div id="master" class="row">
<div class="col-md-12">
	<div class="row">
		<h3>Gestión de los archivos multimedia</h3>
	</div>
	
	<div class="row">
		<div class="col-md-6 col-md-pull-3" v-if="showReadError">
			<div class="alert alert-danger alert-dismissable">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong>Error!</strong> No se ha podido leer de la base de datos
			</div>
		</div>
		<div class="col-md-6 col-md-push-3" v-if="showDelSuccess">
			<div class="alert alert-success alert-dismissable">
				<strong>Correcto!</strong> Se ha eliminado el elemento
			</div>
		</div>
		<div class="col-md-6" v-if="showDelError">
			<div class="alert alert-danger alert-dismissable">
				<strong>Error!</strong> No se ha podido eliminar el elemento
			</div>
		</div>
		<div class="col-md-6" v-if="showUpdSuccess">
			<div class="alert alert-success alert-dismissable">
				<strong>Correcto!</strong> Se ha actualizado el elemento
			</div>
		</div>
		<div class="col-md-6" v-if="showUpdError">
			<div class="alert alert-danger alert-dismissable">
				<strong>Error!</strong> No se ha podido actualizar el elemento
			</div>
		</div>
	</div>
	
	<div class="row">
		<div class="col-md-12">
		<input type="button" name="crear" value="Subir Archivo" class="btn btn-info"
			v-on:click = "showDetail"/>
		</div>
	</div>

	<div id="detail" class="row">
	</div>

	<div class="row">
		<div class="col-md-10">
		<div class="table-responsive">
			
			<table class="table table-bordered table-striped table-hover" v-if="archivos != null">
			<thead>
				<tr>
				<th>Titulo</th>
				<th>Tipo</th>
				<th>Formato</th>
				<th>Tama&ntilde;o (MB)</th>
				<th>Duracion (h)</th>
				<th></th>
				</tr>
			</thead>
			
			<tbody>
				<tr v-for="archivo in archivos">
					<td>{{ archivo.Titulo }}</td>
					<td>{{ archivo.Tipo }}</td>
					<td>{{ archivo.Formato }}</td>
					<td>{{ archivo.TamanioMb }}</td>
					<td>{{ archivo.Duracion}}</td>
					<td>
						<button class="btn btn-warning glyphicon glyphicon-pencil"
							v-on:click="showDetail" v-bind:id="archivo.Id"> </button>
						<button class="btn btn-danger glyphicon glyphicon-remove"
							v-on:click="eliminar" v-bind:id="archivo.Id"></button>
					</td>
				</tr>
			</tbody>
			</table>
			
<!--				<a href="#" class="list-group-item row col-md-4" v-for= "archivo in archivos"-->
<!--					v-on:click= "showDetail" id="archivo.Id" v-bind:id = "archivo.Id">-->
<!--					{{archivo.Titulo}}-->
		</div>
		</div>
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
			showReadError: false,
			showDelSuccess: false,
			showDelError: false,
			showUpdSuccess: false,
			showUpdError: false,
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
			axios.get(SERVER+'/api/Archivo')
			.then (result => {
				this.archivos = result.data;
			})
			.catch( showReadError=>{
				this.showReadError = true
			})
		},
		showDetail: function(event){
			let archivo = this.devuelveArchivo(event.target.id)
			new Vue({
				el: '#detail',
				data:{
					archivo:archivo
				},
				render: h => h(ArchivosDetail)
			})
		},
		eliminar: function(event){
			axios.delete(SERVER+'/api/Archivo/'+event.target.id)
			 .then(result => {
			 	this.archivo = result.data
			 	EventBus.$emit('cambiosArchivo',event.target.id )
			 	this.showDelSuccess = true
			})
			.catch( showReadError=>{
				this.showDelError = true
			})
		},
		devuelveArchivo: function(id){
			var resultado
			this.archivos.forEach(function(archivo){
				if(archivo.Id == id){
					resultado = archivo
				}		
			})
			return resultado
		}
	}
}
</script>
