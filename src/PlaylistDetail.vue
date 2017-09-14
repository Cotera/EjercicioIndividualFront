<template>
	<div id="detail" class="row">
		<div class="col-md-12">

			<form onsubmit="return false" v-if="active">
				<div class="row">
					<div class="col-md-12">
						<h3 v-if="playlist.Id">Actualizar Playlist</h3>
						<h3 v-else>Nueva playlist</h3>
					</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<input type="hidden" id="id" v-model:value="playlist.Id"/>
						<div class="input-group input-group-lg">
							<span class="input-group-addon">Nombre:</span>
							<input type="text" class="form-control" id="nombre" required
								   v-model:value="playlist.Nombre"/>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<div class="input-group input-group-lg">
							<span class="input-group-addon">NumElementos:</span>
							<input type="text" class="form-control" id="numelementos" required
								   v-model:value="playlist.NumElementos">
						</div>
					</div>
				</div>

			<div class="row">
				<div class="col-md-4">
					<div class="input-group input-group-lg">
						<span class="input-group-addon">Duraci&oacute;n:</span>
						<input type="time" class="form-control" id="duracion"
							   v-model:value="playlist.DuracionTotal">
						<span class="input-group-addon">min</span>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-4">
					<div class="input-group input-group-lg">
						<span class="input-group-addon">P&uacute;blica:</span>
						<input type="checkbox" class="form-control" id="tamanio"
							   v-model:value="playlist.EsPublica">
					</div>
				</div>
			</div>

			<input type ="button" name= "aceptar" value="Aceptar" class="btn btn-success"
				   v-on:click="aceptar"/>
			<input type ="button" name="cancelar" value="Cancelar" class="btn btn-secondary"
				   v-on:click="cerrarDetalle"/>
		</form>
	</div>
	</div>
</template>

<script>
	import {EventBus} from './EventBus.js'
	import axios from 'axios'

	export default {
		name: 'detalle',
		data(){
			return {
				playlist: this.playlist,
				active: true,
			}
		},
		created() {
			if(this.$parent.playlist != undefined){
				this.playlist = this.$parent.playlist

			}else{
				this.playlist = {
					Id: 0,
					Nombre="",
					NumElementos: 0,
					DuracionTotal: "",
					EsPublica: false
				}
			}
		},
		methods: {
			aceptar: function(){
				if(this.playlist.Id == null || this.playlist.Id == 0){
					axios.post(SERVER + '/api/PlayList',this.playlist)
						.then(
							(playlist)=>{
								this.playlist.Id = playlist.data.Id
								this.cerrarDetalle()
								EventBus.$emit('alertCreateSuccess')
							})
						.catch(function(){
							EventBus.$emit('alertCreateError')
						})
				}else{
					axios.put(SERVER + '/api/PlayList/'+this.playlist.Id,this.playlist)
						.then( ()=>{
							this.cerrarDetalle()
							EventBus.$emit('alertUpdSuccess')
						})
						.catch( () => {
							EventBus.$emit('alertUpdError')
						})
				}
			},
			cerrarDetalle: function(){
				this.active = false
				EventBus.$emit('cambiosPlaylist',this.playlist)
			}
		}
	}
</script>
