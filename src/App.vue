<template>
<div id="app" class="container">
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<ul class="nav navbar-nav">
				<li>
					<a href="#" id="archivo" class="glyphicon glyphicon-file" v-on:click="showMaster"
						v-bind:class="{ 'btn-success': archivoView }">
					Gesti&oacute;n de Archivos
					</a>
				</li>
	
<!--				<li>-->
<!--					<a href="#" id="lista" class="glyphicon glyphicon-list">-->
		<!--				id="archivo" v-on:click="showMaster" v-bind:class="{ 'btn-success':  }">-->
<!--					Gesti&oacute;n de Listas-->
<!--					</a>-->
<!--				</li>-->
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
import {EventBus} from './EventBus.js'

export default {
  name: 'app',
  data(){
    return {
		archivoView: false,
//      playlistView: false
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
//            this.playlistView=false
          break
        /*case "tipoDoc":
            this.playlistView=true
            new Vue({
              el: '#master',
              render: h => h(PlayListMaster)
            })
            this.archivoView = false
          break //*/
      }
    }
  }
}
</script>
