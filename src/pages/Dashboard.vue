<script setup>
import  useAuthUser from '../composables/UseAuthUser.js';
const { user } = useAuthUser()
</script>

<template>
    <div class="container flex flex-col-reverse lg:flex-row items-center px-6 mx-auto mt-1 space-y-0 md:space-y-0">
   <h1 class="text-5xl ">Welcome {{ user.user_metadata.name }}</h1>
   <div class="grid grid-cols-3">
    <div class="col-span-1 bg-sky-800 w-1/4 h-1/4"></div>
   </div>
   </div>
</template>