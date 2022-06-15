<template>
     <div class="block col-span-7 col-start-1 bg-white rounded-2xl p-8 m-3 w-3/4">
            <h1>YOUR CHOICES FOR PERIOD 4:</h1>
            <button @click="deleteChoice(choice.id)" class="inline-block text-white bg-slate-600 rounded-full p-3 m-3 w-1/5 mx-auto " v-for="choice in choices" :key="choice.id">
              <a class="float-left">{{choice.subject}}{{choice.code}}  </a>
              <a class="absolute text-2xl text-bold text-white -my-2 mx-2"  @click="console.log('hello')">&times;</a>
            </button>
          </div>
</template>
<script>
export default {
    name:'Choice',
    setup() {
        
    },
}
</script>