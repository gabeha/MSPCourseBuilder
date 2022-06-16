<template>
     <div class="inline-block bg-gray-200 rounded-3xl p-8 m-3  w-1/4">
            <h1>YOUR CHOICES FOR PERIOD 4:</h1>
            <button @click="removechoice(choice.id)" class="block text-white bg-slate-600 rounded-full p-3 m-3 w-1/3 mx-auto " v-for="choice in choices"  :key="choice.id">
              <a class="float-left text-white"> {{choice.code}} {{ choice.hasprereq }} </a>
              <a class="absolute text-2xl text-bold text-white float-right">&times;</a>
            </button>
          </div>
</template>
<script>
export default {
    name:'Choice',
    props: {
        choices: Array
    },
  
    data() {
        return {
            periods: [1],
            sub: ['BIO', 'CHE', 'PHY', 'INT', 'NEU', 'MAT', 'PRA'],
            

        }
    },
    methods: {
        removechoice(id) {
            this.$emit("deletechoice", id)
        }
    }
    
}
</script>