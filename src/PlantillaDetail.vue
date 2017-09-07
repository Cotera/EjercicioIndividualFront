<template>
	<div id="detail">
		
		<form onsubmit="return false" v-if="active">
			<h3 v-if="plantilla.Id">Actualización de Plantilla</h3>
			<h3 v-else>Nueva Plantilla</h3>
			<input type="hidden" id="id" v-model:value="plantilla.Id"/>
			<p><label for="tipo">Tipo: </label><input type="text" required id="sala" v-model:value="plantilla.Tipo"/></p>
			<p><label for="descripcion">Descripción: </label><textarea required id="butaca" v-model:value="plantilla.Descripcion" rows="5" cols="20"></textarea></p>
			<p>
				<label for="tipoUsuario">Tipo de usuario: </label>
				<select v-model:value="plantilla.TipoUsuario" id="tipoUsuario" required>
				  <option v-for="option in tiposUsuarios" v-bind:value="option.value">
				    {{ option.text }}
				  </option>
				</select>
			</p>
			<p><label for="editable" class="checkbox-inline"><input type="checkbox" required id="editable" class="checkbox checkbox-primary" v-model:value="plantilla.Editable"/> Editable</label></p>
			<p v-if="plantilla.FechaCreacion"><label for="fechaCreacion">Fecha de creacion: </label><input type="date" required id="fila" v-model:value="this.plantilla.FechaCreacion.toString().split('T')[0]" readonly/></p>
			<p>
				<input type ="button" name="aceptar" value="Aceptar" class="btn btn-success" v-on:click="aceptar"/>
				<input type ="button" name="cancelar" value="Cancelar" class="btn btn-secondary" v-on:click="cerrarDetalle"/>
				<input v-if="plantilla.Id" type ="button" name="eliminar" class="btn btn-danger"value="Eliminar" v-on:click="eliminar"/>
				
			</p>
		</form>
		
	</div>
</template>

<script>
import {EventBus} from './EventBus.js'
import axios from 'axios'
export default {
	name: 'detalle',
	data(){
		return {
			plantilla:this.plantilla,
			active:true,
			tiposUsuarios:[
				{text:'Administrador',value:'Administrador'},
				{text:'Editor',value:'Editor'},
				{text:'Gestor',value:'Gestor'},
				{text:'Usuario',value:'Usuario'}
			]
		}
		
	},
	created() {
		if(this.$parent.plantilla != undefined){
			this.plantilla = this.$parent.plantilla
		}else{
			this.plantilla = {
				Id:null,
				Tipo:"",
				Descripcion:"",
				FechaCreacion:"",
				TipoUsuario:"",
				Editable:false
			}
		}
	},
	methods: {
		eliminar: function(){
			axios.delete(SERVER+'/api/Plantillas/'+this.plantilla.Id)
			 .then(result => {
			 	this.plantilla = result.data
			 	EventBus.$emit('cambiosPlantilla',this.plantilla)
			 	alert('Plantilla eliminada con exito')
			 	this.cerrarDetalle()
			})
			.catch(function(){
				alert("Error al eliminar la plantilla")
			})
			
		},
		aceptar: function(){
			if(this.plantilla.Id==null || this.plantilla.Id==0){
				this.plantilla.Id = 0
				this.plantilla.FechaCreacion= new Date()
				axios.post(SERVER + '/api/Plantillas',this.plantilla)
				.then(
					(plantilla)=>{
					this.plantilla.Id = plantilla.data.Id
					EventBus.$emit('cambiosPlantilla',this.plantilla)
					this.cerrarDetalle()

				})
				.catch(function(){
					alert("Error al crear la plantilla")
				})
			}else{
				axios.put(SERVER + '/api/Plantillas/'+this.plantilla.Id,this.plantilla)
				.then(
					()=>{
						EventBus.$emit('cambiosPlantilla',this.plantilla)
						this.cerrarDetalle()
				})
				.catch(function(){
					alert("Error al actualizar la plantilla")
				})
			}
		},
		cerrarDetalle:function(){
			this.active = false
		}
	}
}
</script>
