<template >

<div>
  <NavBar />
  <SideBar />
  <WikiPage/>
</div>


</template>

<script>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue'
import SideBarAreas from './components/SideBarAreas.vue';
import Buttons from './components/Buttons.vue'
import WikiPage from './components/WikiPage.vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default{

  name:'App',
  components:{
    NavBar,
    SideBar,
    SideBarAreas,
    Buttons,
    WikiPage,
    FontAwesomeIcon,
  },

  methods:{
      toggleAddTask(){
    this.showAddTask = !this.showAddTask

  },
  }
}


</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css');
@import './index.css';



</style>