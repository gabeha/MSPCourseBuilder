<template>
<div class="p-t-8 w-3/4  px-9 mt-8">
   
    <div class= "grid grid-cols-10 py-5 text-white   px-1 trunicate text-center rounded-t-3xl h-24 bg-green-500">
        <button @click="previous()" class="col-span-1 text-4xl font-bold"> &lt; </button>
        <h1 class="text-bold w-full col-span-8 text-3xl">SEMESTER {{ semester }}</h1>
        <button @click="next()" class="text-4xl font-bold col-span-1"> > </button>
    </div>        
 </div>
  
    
</template>

<script>
export default {
    name: 'Toggle',
    props: {
        this_period: Intl,
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