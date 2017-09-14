<template>
<div id="app" class="container">
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<ul class="nav navbar-nav">
				<li v-bind:class="{ 'active': archivoView }">
					<a href="#" id="archivo" class="glyphicon glyphicon-file" v-on:click="showMaster">
					Gesti&oacute;n de Archivos
					</a>
				</li>
	
<!--				<li v-bind:class="{ 'active': playlistView }">-->
<!--					<a href="#" id="playlist" class="glyphicon glyphicon-list" v-on:click="showMaster">-->
<!--						Gesti&oacute;n de listas-->
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
//import PlaylistMaster from './PlaylistMaster.vue'
import {EventBus} from './EventBus.js'

export default {
  name: 'app',
  data(){
    return {
		archivoView: false,
        //playlistView: false
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
            //this.playlistView=false
          break
	/*	case "playlist":
            this.playlistView=true
            new Vue({
              el: '#master',
              render: h => h(PlaylistMaster)
            })
            this.archivoView = false
          break*/
      }
    }
  }
}
</script>
