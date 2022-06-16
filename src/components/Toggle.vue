<template>
<div class="p-t-8 px-8 mt-8">
    <div class= "w-3/4  px-5 trunicate text-center rounded-t-3xl h-24 bg-green-500">
        <button @click="previous()" class=" text-black float-left  text-xl font-bold"> &lt; </button>
        <h1 class="text-xl text-white font-bold">SEMESTER {{ semester }} Period: {{ period }} </h1>
        <button @click="next()" class="float-right text-xl text-black font-bold "> > </button>
    </div>        
 </div>
  
    
</template>

<script>
export default {
    name: 'Toggle',
    props: {
        period: Intl,
        semester: Intl,
    },
   
    data() {
        return {
        }
    },

    methods: {
        next() {
            this.$emit("nextperiod")
        },
        previous() {
            this.$emit("lastperiod")
        }
    }
}


</script>