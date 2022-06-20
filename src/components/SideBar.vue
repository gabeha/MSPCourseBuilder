<template>
  <span class="z-20 absolute text-white text-4xl top-3 left-3 cursor-pointer" @click="Open()">
    <i class="bi bi-list bg-gray-900 rounded-md px-2 lg:hidden"></i>
  </span>
 <!-- Sidebar -->
  <div class="sidebar z-10 fixed top-0 mt-16 bottom-0 lg:left-0 left-[-300px] p-2 w-[300px] overflow-y-auto text-center bg-[#000928] ">
    <!-- Top part menu -->
    <div class="text-white text-xl">
      <div class="p-2.5 mt-1 flex items-center">
        <i class="bi bi-app-indicator px-2 py-1 bg-amber-600 rounded-md"></i>
        <h1 class="font-bold text-gra-200 text-[15px] ml-3">
            Courses
        </h1>
        <i class="bi bi-x ml-24 cursor-pointer lg:hidden rounded-md hover:bg-amber-600" @click="Open()"></i> 
      </div>
      <hr class="my-2 text-gray-600">
    </div>
    
    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
     <i class="bi bi-search text-sm"></i>
     <input type="text" id="search" placeholder="Find your course" class="text-[15px] ml-4 w-full bg-transparent focus:outline-none">
    </div>
    <div id="match-list" class="text-white rounded-md"></div>

    <div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-amber-600">
      <i class="bi bi-house-door-fill text-sm"></i>
      <span class="text-[15px] ml-4 text-gray-200">Home</span>
           
    </div>
    <div class="p-2.5 mt-3 md:hidden flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-amber-600">
      <i class="bi bi-house-door-fill text-sm"></i>
      <span class="text-[15px] md:hidden ml-4 text-gray-200">Course Builder</span>
    </div>
    <div class="p-2.5 mt-3 md:hidden flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-amber-600">
      <i class="bi bi-house-door-fill text-sm"></i>
      <span class="text-[15px] md:hidden ml-4 text-gray-200">Wiki</span>
    </div>
    <div class="p-2.5 mt-3 md:hidden flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-amber-600">
      <i class="bi bi-house-door-fill text-sm"></i>
      <span class="text-[15px] md:hidden ml-4 text-gray-200">About Us</span>
    </div>
    <div class="p-2.5 mt-3 md:hidden flex items-center rounded-md px-4 duration-300 cursor-pointer text-white hover:bg-amber-600">
      <i class="bi bi-house-door-fill text-sm"></i>
      <span class="text-[15px] md:hidden ml-4 text-gray-200">FAQ</span>
    </div>

<hr class="my-2 text-gray-600">
<!-- Courses -->
<SideBarAreas title="Physics" icon="bi bi-hurricane" />
<SideBarAreas title="Mathematics" icon="bi bi-123" />
<SideBarAreas title="Chemistry" icon="bi bi-radioactive" />
<SideBarAreas title="Biology" icon="bi bi-bug" />
<SideBarAreas title="Neuroscience" icon="bi bi-bezier" />
<SideBarAreas title="Interdisciplinary" icon="bi bi-boxes" />
<!-- End of Courses -->

  </div>
</template>

<script>
import SideBarAreas from './SideBarAreas.vue'

export default{

    name:"sidebar",
    components:{
        SideBarAreas,
    },
    data(){
        return{
            showCourses:false,
        }
  },
    
    methods:{
 
    Open() {
      document.querySelector('.sidebar').classList.toggle('left-[-300px]');
    },

    toggleCourses(){
        this.showCourses = !this.showCourses;
    }
    }
}
</script>