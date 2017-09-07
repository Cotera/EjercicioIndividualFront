<template>
<div id="master" class="center-block">
	<ul class="list-group">
		<p>Seleccione un Tipo de Documento para editarlo o cree uno nuevo.</p>
		<p><input type="button" name="crear" value="Nuevo Tipo Documento" class="btn btn-secondary" v-on:click = "showDetail"/></p>
		<a href="#" class="list-group-item row col-md-4" v-for= "tipoDoc in tiposDoc" v-on:click= "showDetail" id="tipoDoc.Id" v-bind:id = "tipoDoc.Id">{{tipoDoc.Descripcion}}</a>
	</ul> 
	<div id="detail"></div>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import {EventBus} from './EventBus.js'
import TipoDocDetail from './TipoDocDetail.vue'
export default{
	name: 'master',
	data () {
		return {
			tiposDoc: null
		}
	},
	created(){
		this.getAll()
		EventBus.$on('cambiosTipoDoc',
			this.getAll
		)
		
	},
	methods: {
		getAll: function(){
			axios.get(SERVER+'/api/TipoDocumento') // Paula
			.then (result => {
				this.tiposDoc = result.data;
			})
		},
		showDetail: function(event){
			let tipoDoc = this.devuelveTipoDoc(event.target.id)
			new Vue({
				el: '#detail',
				data:{
					tipoDoc:tipoDoc
				},
				render: h => h(TipoDocDetail)
			})
		},
		devuelveTipoDoc: function(id){
			var resultado
			this.tiposDoc.forEach(function(tipoDoc){
				if(tipoDoc.Id == id){
					resultado = tipoDoc
				}		

			})
			return resultado
		}
	}
}
</script>
