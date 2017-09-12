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
		<div class="table-responsive">
			
			<table class="table table-striped table-hover" v-if="archivos != null">
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
						<button class="btn btn-warning glyphicon glyphicon-edit"></button>
					</td>
				</tr>
			</tbody>
			</table>
			
			<ul class="list-group">
				<a href="#" class="list-group-item row col-md-4" v-for= "archivo in archivos"
					v-on:click= "showDetail" id="archivo.Id" v-bind:id = "archivo.Id">
					{{archivo.Titulo}}
				</a>
			</ul>
		</div>
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
			let archivo = this.devuelveArchivo(event.target.id)
			new Vue({
				el: '#detail',
				data:{
					archivo:archivo
				},
				render: h => h(ArchivosDetail)
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
