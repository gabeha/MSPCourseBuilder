<script setup>
import  useAuthUser from '../composables/UseAuthUser.js';
const { user } = useAuthUser()
</script>

<template>
    <div class="container lg:flex-row items-center px-6 mx-auto mt-1 space-y-0 md:space-y-0">
   <h1 class="text-5xl mb-16">Welcome {{ user.user_metadata.name }}</h1>
   <div class="grid grid-cols-4 w-full mx-auto gap-5">
    <div class="col-span-1 row-span-2 rounded-xl text-center p-5  bg-sky-800 w-full h-96">
        <a class="text-white text-2xl  w-full font-bold"> TRACKER </a>
    </div>
        <div class="col-span-1 row-span-1 relative rounded-xl text-center  w-full">
         <div class="bg-white border-2 m-2 relative rounded-2xl h-10 w-full text-xl mx-auto ">
          <h1 class="mx-auto absolute inline-block text-sky-800 left-2 mb-7">CREDITS: </h1>
          <h1 class="mx-auto absolute right-w  text-sky-800 inline-block pr-3  mb-7"> {{ this.credits }} / 180 total </h1>
     </div>
      </div>
      
   
    
    <div class="col-span-2 border-2 row-span-5 w-full text-center h-full"><a class="text-sky-800 text-2xl  w-full font-bold"> Academic Calendar </a></div>
   
    <div class="col-span-2 border-2 row-span-5 w-full text-center h-full"><a class="text-sky-800 text-2xl  w-full font-bold"> Your choices </a></div>
     <div class="col-span-1 row-span-1 relative rounded-xl text-center  w-full">
         <div class="bg-white border-2 m-2 relative rounded-2xl col-span-1 row-span-1 w-full text-xl mx-auto ">
          <!-- <progress value=30 max="180" class="absolute overflow-hidden w-full right-0  h-full"  > -->
          <h1 class="mx-auto break-line text-sky-800 mb-7">COURSES YOU MEET THE PRE-REQUISITES FOR:</h1>
          </div>
      </div>
   </div></div> 
</template>
<script>
import router from '../router.js'

export default {
    name: 'Dashboard',
    components: {
    
    },
    data() {
        return {
            credits: 60
        }
    },
    mounted() {

    },
    computed() {

    },
    methods: {
        test() {
            console.log('Hi')
        }

    }
}
</script>