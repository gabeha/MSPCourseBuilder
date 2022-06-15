<template>
     <div class="inline-block bg-red-300 rounded-2xl p-8 m-3  w-1/4">
            <h1>YOUR CHOICES FOR PERIOD 4:</h1>
            <button @click="deleteChoice(choice.id)" class="inline-block text-white bg-slate-600 rounded-full p-3 m-3 w-1/5 mx-auto " v-for="choice in choices"  :key="choice.id">
              <a class="float-left text-white">{{ choice.id }} {{choice.subject}} {{choice.code}} {{ choices }} </a>
              <a class="absolute text-2xl text-bold text-white -my-2 mx-2"  @click="console.log('hello')">&times;</a>
            </button>
          </div>
</template>
<script>
export default {
    name:'Choice',
    props: {
        choices: Array
    },
    components: {
    
        
    },
    data() {
        return {
            periods: [1],
            sub: ['BIO', 'CHE', 'PHY', 'INT', 'NEU', 'MAT', 'PRA'],
            

        }
    },
}
</script>