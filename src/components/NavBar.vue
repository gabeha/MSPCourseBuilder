<template>
  <nav class="z-20 relative p-2 px-10 border-amber-600 border-b-4 py-2 bg-[#000924]">
    <!--Flexcontainer-->
        <div class="flex items-center justify-end ">
            <!-- Logo -->
            <div class="pt-2">
                <img src="" class="w-12" alt=""> 
            </div>
  
                <div id="navbarselection" class="items-center hidden md:flex space-x-14 pr-6 text-white">
                    <Links class="hover:text-amber-600" text="Course builder"/>
                    <Links class="hover:text-amber-600" text="Wiki"/>
                    <Links class="hover:text-amber-600" text="About Us"/>
                    <Links class="hover:text-amber-600" text="FAQ"/>
                </div>
               
                <!--button-->
                <Links class="p-3 px-6 py-3 text-white bg-amber-600 rounded-full baseline hover:bg-sky-800" text="Start Now"/>
        
    </div>
  </nav>
</template>

<script>
import Links from './Links.vue';

export default{
    name:'navbar',
    components:{
        Links
    }
}

</script>