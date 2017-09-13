<template>
	<div id="detail" class="row">
		<div class="col-md-12">

			<form onsubmit="return false" v-if="active">
				//TODO ajustar el formulario a la playlist
				<div class="row">
					<div class="col-md-12">
						<h3 v-if="playlist.Id">Actualización de Archivo</h3>
						<h3 v-else>Nuevo Archivo</h3>
					</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<input type="hidden" id="id" v-model:value="playlist.Id"/>
						<div class="input-group input-group-lg">
							<span class="input-group-addon">T&iacute;tulo:</span>
							<input type="text" class="form-control" id="titulo" required
								   v-model:value="playlist.Titulo"/>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<div class="input-group input-group-lg">
							<span class="input-group-addon">Tipo de playlist:</span>
							<select class="form-control" id="tipo" required
									v-model:value="playlist.Tipo">
								<option v-for="option in tiposArchivo" v-bind:value="option.value">
									{{ option.text }}
								</option>
							</select>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-md-4">
						<div class="input-group input-group-lg">
							<span class="input-group-addon">Formato:</span>
							<input type="text" class="form-control" id="formato" required
								   v-model:value="playlist.Formato">
						</div>
					</div>
				</div>

			<div class="row">
				<div class="col-md-4">
					<div class="input-group input-group-lg">
						<span class="input-group-addon">Tama&ntilde;o:</span>
						<input type="number" class="form-control" id="tamanio"
							   v-model:value="playlist.TamanioMb">
						<span class="input-group-addon">MB</span>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-4">
					<div class="input-group input-group-lg">
						<span class="input-group-addon">Duraci&oacute;n:</span>
						<input type="time" class="form-control" id="duracion"
							   v-model:value="playlist.Duracion">
						<span class="input-group-addon">min</span>
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
					// TODO Rellenar campos
				}
			}
		},
		methods: {
			aceptar: function(){
				if(this.playlist.Id == null || this.playlist.Id == 0){

					axios.post(SERVER + '/api/PlayList',this.playlist)// TODO llamar al rest
						.then(
							(playlist)=>{
								this.playlist.Id = playlist.data.Id
								this.cerrarDetalle()
								EventBus.$emit('alertCreateSuccess')
							})
						.catch(function(){
							alert("Error al crear el playlist")
							EventBus.$emit('alertCreateError')
						})
				}else{
					axios.put(SERVER + '/api/PlayList/'+this.playlist.Id,this.playlist)// TODO llamar al rest
						.then( ()=>{
							this.cerrarDetalle()
							EventBus.$emit('alertUpdSuccess')
						})
						.catch( () => {
							alert("Error al actualizar el playlist")
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
