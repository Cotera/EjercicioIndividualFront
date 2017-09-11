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
			<input type ="button" name="eliminar" value="Eliminar" class="btn btn-danger"
				v-if="archivo.Id" v-on:click="eliminar"/>
				
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
			archivo:this.archivo,
			active:true,
			tiposArchivo:[
				{text:'Video',value:'video'},
				{text:'Sonido',value:'sonido'},
				{text:'Imagen',value:'imagen'},
				{text:'Otros',value:'otros<>'}
			]
		}
		
	},
	created() {
		if(this.$parent.archivo != undefined){
			this.archivo = this.$parent.archivo
		}else{
			this.archivo = {
				Id:null,
				Titulo:"",
				Tipo:"",
				Formato:"",
				TamanioMb:"",
				Duracion:""
			}
		}
	},
	methods: {
		eliminar: function(){
			console.log("Entro en DELETE")
		
			axios.delete(SERVER+'/api/Archivos/'+this.archivo.Id)
			 .then(result => {
			 	this.archivo = result.data
			 	EventBus.$emit('cambiosArchivo',this.archivo)
			 	alert('Archivo eliminado con exito')
			 	this.cerrarDetalle()
			})
			.catch(function(){
				alert("Error al eliminar el archivo")
			})
			
		},
		aceptar: function(){
			if(this.archivo.Id==null || this.archivo.Id==0){
				this.archivo.Id = 0
				this.archivo.FechaCreacion= new Date()
				
				console.log("Entro en POST "+ SERVER)
				
				axios.post(SERVER + '/api/Archivos',this.archivo.Id)
				.then(
					(archivo)=>{
					this.archivo.Id = archivo.data.Id
					EventBus.$emit('cambiosArchivo',this.archivo)
					this.cerrarDetalle()

				})
				.catch(function(){
					alert("Error al crear el archivo")
				})
			}else{
				console.log("Entro en PUT")
				axios.put(SERVER + '/api/Archivos/'+this.archivo.Id,this.archivo)
				.then(
					()=>{
						EventBus.$emit('cambiosArchivo',this.archivo)
						this.cerrarDetalle()
				})
				.catch(function(){
					alert("Error al actualizar el archivo")
				})
			}
		},
		cerrarDetalle:function(){
			this.active = false
		}
	}
}
</script>
