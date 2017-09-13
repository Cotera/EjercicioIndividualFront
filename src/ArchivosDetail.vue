<template>
	<div id="detail" class="row">
	<div class="col-md-12">

		<form onsubmit="return false" v-if="active">
			<div class="row">
				<div class="col-md-12">
					<h3 v-if="archivo.Id">Actualización de Archivo</h3>
					<h3 v-else>Nuevo Archivo</h3>
				</div>
			</div>
			
			<div class="row">
				<div class="col-md-4">
					<input type="hidden" id="id" v-model:value="archivo.Id"/>
					<div class="input-group input-group-lg"">
						<span class="input-group-addon">T&iacute;tulo:</span>
						<input type="text" class="form-control" id="titulo" required
							v-model:value="archivo.Titulo"/>
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="col-md-4">
				<div class="input-group input-group-lg">
					<span class="input-group-addon">Tipo de archivo:</span>
					<select class="form-control" id="tipo" required
						v-model:value="archivo.Tipo">
						<option v-for="option in tiposArchivo" v-bind:value="option.value">
						{{ option.text }}
						</option>
					</select>
				</div>
				</div>
			</div>
			
			<div class="row">
				<div class="col-md-4">
				<div class="input-group input-group-lg"">
					<span class="input-group-addon">Formato:</span>
					<input type="text" class="form-control" id="formato" required
						v-model:value="archivo.Formato">
				</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-4">
				<div class="input-group input-group-lg"">
					<span class="input-group-addon">Tama&ntilde;o:</span>
					<input type="number" class="form-control" id="tamanio"
						v-model:value="archivo.TamanioMb">
					<span class="input-group-addon">MB</span>
				</div>
				</div>
			</div>
			
			<div class="row">
				<div class="col-md-4">
				<div class="input-group input-group-lg"">
					<span class="input-group-addon">Duraci&oacute;n:</span>
					<input type="time" class="form-control" id="duracion"
						v-model:value="archivo.Duracion">
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
			archivo: this.archivo,
			active: true,
			tiposArchivo: [
				{text:'Video', value:'video'},
				{text:'Sonido', value:'sonido'},
				{text:'Imagen', value:'imagen'},
				{text:'Otros', value:'otros<>'}
			]
		}
		
	},
	created() {
		this.showUpdSuccess = this.$parent.showUpdSuccess
		if(this.$parent.archivo != undefined){
			this.archivo = this.$parent.archivo
			
		}else{
			this.archivo = {
				Id: null,
				Titulo: "",
				Tipo: "",
				Formato: "",
				TamanioMb: "",
				Duracion: ""
			}
		}
	},
	methods: {
		aceptar: function(){
			var _this = this;
			if(this.archivo.Id == null || this.archivo.Id == 0){
				
				axios.post(SERVER + '/api/Archivo',this.archivo)
				.then(
					(archivo)=>{
					this.archivo.Id = archivo.data.Id
					this.cerrarDetalle()
				})
				.catch(function(){
					alert("Error al crear el archivo")
				})
			}else{
				axios.put(SERVER + '/api/Archivo/'+this.archivo.Id,this.archivo)
				.then( ()=>{
						this.cerrarDetalle()
						//console.log("showUpdSuccess "+_this.$parent);
						this.showUpdSuccess = true
				})
				.catch( () => {
					alert("Error al actualizar el archivo")
					this.showUpdError = true
				})
			}
		},
		cerrarDetalle: function(){
			this.active = false
			EventBus.$emit('cambiosArchivo',this.archivo)
		}
	}
}
</script>
