<template>
	<div id="master" class="row">
		<div class="col-md-12">
			<div class="row">
				<h3>Gestión de las Play Lists</h3>
			</div>

			<div class="row">
				<div class="col-md-6 col-md-push-3" v-if="showReadError">
					<div class="alert alert-danger alert-dismissable">
						<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
						<strong>Error!</strong> No se ha podido leer de la base de datos
					</div>
				</div>

				<div class="col-md-6 col-md-push-3" v-if="showDelSuccess">
					<div class="alert alert-success alert-dismissable">
						<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
						<strong>Correcto!</strong> Se ha eliminado la playlist
					</div>
				</div>
				<div class="col-md-6 col-md-push-3" v-if="showDelError">
					<div class="alert alert-danger alert-dismissable">
						<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
						<strong>Error!</strong> No se ha podido eliminar la playlist
					</div>
				</div>

				<div class="col-md-6 col-md-push-3" v-if="showUpdSuccess">
					<div class="alert alert-success alert-dismissable">
						<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
						<strong>Correcto!</strong> Se ha actualizado la playlist
					</div>
				</div>
				<div class="col-md-6 col-md-push-3" v-if="showUpdError">
					<div class="alert alert-danger alert-dismissable">
						<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
						<strong>Error!</strong> No se ha podido actualizar la playlist
					</div>
				</div>

				<div class="col-md-6 col-md-push-3" v-if="showCreSuccess">
					<div class="alert alert-success alert-dismissable">
						<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
						<strong>Correcto!</strong> Se ha guardado la playlist
					</div>
				</div>
				<div class="col-md-6 col-md-push-3" v-if="showCreError">
					<div class="alert alert-danger alert-dismissable">
						<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
						<strong>Error!</strong> No se ha podido guardar la playlist
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-12">
					<input type="button" name="crear" value="Nueva Playlist" class="btn btn-info"
						   v-on:click = "showDetail"/>
				</div>
			</div>

			<div id="detail" class="row">
			</div>

			<div class="row">
				<div class="col-md-10">
					<div class="table-responsive">

						<table class="table table-bordered table-striped table-hover" v-if="playlists != null">
							<thead>
							<tr>
								<th>Nombre</th>
								<th>Pistas</th>
								<th>Duracion (h)</th>
								<th>Publica</th>
								<th></th>
							</tr>
							</thead>

							<tbody>
							<tr v-for="playlist in playlists">
								<td>{{ playlist.Nombre }}</td>
								<td>{{ playlist.NumElementos }}</td>
								<td>{{ playlist.DuracionTotal }}</td>
								<td>{{ playlist.EsPublica }}</td>
								<td>
									<button class="btn btn-warning glyphicon glyphicon-pencil"
											v-on:click="showDetail" v-bind:id="playlist.Id"> </button>
									<button class="btn btn-danger glyphicon glyphicon-remove"
											v-on:click="eliminar" v-bind:id="playlist.Id"></button>
								</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Vue from 'vue'
	import PlaylistDetail from './PlaylistDetail.vue'
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
				showCreSuccess: false,
				showCreError: false,
				playlists: []
			}
		},
		created(){
			this.getAll()
			EventBus.$on('cambiosPlaylist',
				this.getAll
			)
			EventBus.$on('alertUpdSuccess', showUpdSuccess => {
				this.showReadError= false

				this.showDelSuccess= false
				this.showDelError= false

				this.showUpdSuccess= true
				this.showUpdError= false

				this.showCreSuccess= false
				this.showCreError= false
			})
			EventBus.$on('alertUpdError', showUpdError => {
				this.showReadError= false

				this.showDelSuccess= false
				this.showDelError= false

				this.showUpdSuccess= false
				this.showUpdError= true

				this.showCreSuccess= false
				this.showCreError= false
			})
			EventBus.$on('alertCreateSuccess', (success) => {
				this.showReadError= false

				this.showDelSuccess= false
				this.showDelError= false

				this.showUpdSuccess= false
				this.showUpdError= false

				this.showCreSuccess= true
				this.showCreError= false
			})
			EventBus.$on('alertCreateError', (success) => {

				this.showReadError= false

				this.showDelSuccess= false
				this.showDelError= false

				this.showUpdSuccess= false
				this.showUpdError= false

				this.showCreSuccess= false
				this.showCreError= true
			})
		},
		methods: {
			getAll: function(){
				axios.get(SERVER+'/api/PlayList')
					.then (result => {
						this.playlists = result.data;
					})
					.catch( showReadError=>{
						this.showReadError = true
					})
			},
			showDetail: function(event){
				let playlist = this.devuelvePlaylist(event.target.id)
				new Vue({
					el: '#detail',
					data:{
						playlist:playlist
					},
					render: h => h(PlaylistDetail)
				})
			},
			eliminar: function(event){
				axios.delete(SERVER+'/api/PlayList/'+event.target.id)
					.then(result => {
						this.playlist = result.data
						EventBus.$emit('cambiosPlaylist',event.target.id )
						this.showDelSuccess = true
					})
					.catch( showReadError=>{
						this.showDelError = true
					})
			},
			devuelvePlaylist: function(id){
				var resultado
				this.playlists.forEach(function(playlist){
					if(playlist.Id == id){
						resultado = playlist
					}
				})
				return resultado
			}
		}
	}
</script>
