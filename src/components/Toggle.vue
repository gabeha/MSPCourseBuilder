<template>
<div class="p-t-8 px-8 mt-8">
    <div class= "w-3/4 mx-auto px-5 trunicate text-center rounded-t-3xl h-24 bg-green-500">
        <button @click="(count > 1) ? count-- : count ; periodInSemester(count)" class=" text-black float-left  text-xl font-bold"> &lt; </button>
        <h1 class="text-xl text-white font-bold">SEMESTER {{ count }}</h1>
        <button @click="(count < 6) ? count++ : count ; periodInSemester(count)" class="float-right text-xl text-black font-bold "> > </button>
    </div>        
 </div>

    
    
</template>


<script>
export default {
    name: 'Toggle',
    props: {
        index: Intl,
        modules: Array,
    

    },
   
    data() {
        return {
            count: 1,
    

        }
    },

    methods: {
        periodInSemester(count) {
            this.$emit("togg", count)
        }
    }

}
</script>