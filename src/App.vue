<template>

<div id="app">
	
	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container-fluid">
<!--			<div class="navbar-header">-->
<!--				<a class="navbar-brand" href="#">Splayer</a>-->
<!--			</div>-->
			<ul class="nav navbar-nav">
				<li class="active">
					<a href="#" id="archivo" v-on:click="showMaster" v-bind:class="{ 'btn-success': achivoView }">
					Gesti&oacute;n de Archivos
					</a>
				</li>
			
				<li>
					<a href="#">
		<!--				id="archivo" v-on:click="showMaster" v-bind:class="{ 'btn-success':  }">-->
					Gesti&oacute;n de Listas
					</a>
				</li>
			</ul>
		</div>
	</nav>
	<div id="master" class="row">
	</div>
</div>
  
</template>
<script>
import Vue from 'vue'
import ArchivosMaster from './ArchivosMaster.vue'

export default {
  name: 'app',
  data(){
    return {
      archivoView: false,
//      tipoDocSelected: false
    }
    
  },
  methods: {
    showMaster:function(event){
      let id = event.target.id
      switch (id){
        case "archivo":
            this.archivoView = true
            new Vue({
              el: '#master',
              render: h => h(ArchivosMaster)
            })
//            this.tipoDocSelected=false
          break
        /*case "tipoDoc":
            this.tipoDocSelected=true
            new Vue({
              el: '#master',
              render: h => h(TipoDocMaster)
            })
            this.archivoView = false
          break //*/
      }
    }
  }
}
</script>
