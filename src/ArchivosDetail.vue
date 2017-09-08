<template>
	<div id="detail" class="row">
		
		<form onsubmit="return false" v-if="active">
			<h3 v-if="archivo.Id">Actualización de Archivo</h3>
			<h3 v-else>Nueva Archivo</h3>
			<input type="hidden" id="id" v-model:value="archivo.Id"/>
			<p><label for="tipo">Tipo: </label><input type="text" required id="sala" v-model:value="archivo.Tipo"/></p>
			<p><label for="descripcion">Descripción: </label><textarea required id="butaca" v-model:value="archivo.Descripcion" rows="5" cols="20"></textarea></p>
			<p>
				<label for="tipoUsuario">Tipo de usuario: </label>
				<select v-model:value="archivo.TipoUsuario" id="tipoUsuario" required>
				  <option v-for="option in tiposUsuarios" v-bind:value="option.value">
				    {{ option.text }}
				  </option>
				</select>
			</p>
			<p><label for="editable" class="checkbox-inline"><input type="checkbox" required id="editable" class="checkbox checkbox-primary" v-model:value="archivo.Editable"/> Editable</label></p>
			<p v-if="archivo.FechaCreacion"><label for="fechaCreacion">Fecha de creacion: </label><input type="date" required id="fila" v-model:value="this.archivo.FechaCreacion.toString().split('T')[0]" readonly/></p>
			<p>
				<input type ="button" name="aceptar" value="Aceptar" class="btn btn-success" v-on:click="aceptar"/>
				<input type ="button" name="cancelar" value="Cancelar" class="btn btn-secondary" v-on:click="cerrarDetalle"/>
				<input v-if="archivo.Id" type ="button" name="eliminar" class="btn btn-danger"value="Eliminar" v-on:click="eliminar"/>
				
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
			archivo:this.archivo,
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
		if(this.$parent.archivo != undefined){
			this.archivo = this.$parent.archivo
		}else{
			this.archivo = {
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
			axios.delete(SERVER+'/api/Archivos/'+this.archivo.Id)
			 .then(result => {
			 	this.archivo = result.data
			 	EventBus.$emit('cambiosArchivo',this.archivo)
			 	alert('Archivo eliminada con exito')
			 	this.cerrarDetalle()
			})
			.catch(function(){
				alert("Error al eliminar la archivo")
			})
			
		},
		aceptar: function(){
			if(this.archivo.Id==null || this.archivo.Id==0){
				this.archivo.Id = 0
				this.archivo.FechaCreacion= new Date()
				axios.post(SERVER + '/api/Archivos',this.archivo)
				.then(
					(archivo)=>{
					this.archivo.Id = archivo.data.Id
					EventBus.$emit('cambiosArchivo',this.archivo)
					this.cerrarDetalle()

				})
				.catch(function(){
					alert("Error al crear la archivo")
				})
			}else{
				axios.put(SERVER + '/api/Archivos/'+this.archivo.Id,this.archivo)
				.then(
					()=>{
						EventBus.$emit('cambiosArchivo',this.archivo)
						this.cerrarDetalle()
				})
				.catch(function(){
					alert("Error al actualizar la archivo")
				})
			}
		},
		cerrarDetalle:function(){
			this.active = false
		}
	}
}
</script>
