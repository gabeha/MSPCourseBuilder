<template>
    <div v-for="(semester, index) in semesters" :key="index" class="grid gap-4 grid-cols-2 grid-flow-col-dense  w-full bg-gray-200 rounded-3xl mx-auto p-8">
    <div class= "col-start-1 w-full col-span-2 row-span-1 text-center rounded-t-full h-20 row-start-1  bg-slate-800"><h1 class="text-xl font-bold">SEMESTER {{ semester }}</h1></div>
        <div v-for="(period, index) in periods" :key="index"  class="relative block row-start-auto w-full" :class="(period == 1) ? 'bg-green-200 col-start-1 col-span-1 row-start-2 row-span-1'
                                        :(period == 2) ? 'bg-green-200 col-start-2 col-span-1 row-span-1 row-start-2'
                                        :(period == 4) ? 'bg-green-200 col-start-1 col-span-1 row-span-1 row-start-3'
                                        : 'bg-green-200 col-start-2 col-span-2 row-span-1 row-start-3'">
                <h2 class="text-black rounded-t-xl text-center tracking-widest">PERIOD {{ period }}</h2>
              
        <div class="grid grid-cols-7  grid-flow-col-dense justify-between ">         
              <button class="relative block pr-70 bg-white  text-start pr-8 rounded-full m-3 h-12 w-32" v-for="module in modules" :key="module.id" 
              :class=" (module.subject === 'BIO') ? 'text-green-500 col-start-1 col-span-1 row-span-1 order-1'
                            : (module.subject === 'CHE') ? 'text-teal-500 :hover col-start-2 col-span-1 row-start-auto  order-2'
                            : (module.subject === 'PHY') ? 'text-sky-500 col-start-3 col-span-1 row-start-auto order-3'
                            : (module.subject === 'MAT') ? 'text-red-400 col-start-4 col-span-1 row-start-auto order-4'
                            : (module.subject === 'INT') ? 'text-indigo-400 col-start-5 col-span-1 row-start-auto order-5'
                            : (module.subject === 'NEU') ? 'text-rose-300 col-start-6 col-span-1 row-start-auto order-6 inline'
                            :'bg-slate-600 col-start-7 col-span-1 order-last'" @click="matchModules(module.id, module.subject, module.code, module.start1, module.end1, module.start2, module.end2, module.start3, module.end3)">
                            <p class="font-bold mx-auto  text-xs inline"> {{module.subject}} {{module.code}} {{module.id}} </p>
                             
                            <span class="w-10 h-12 inline-block rounded-r-full -my-3 absolute right-0" :class="(module.subject === 'BIO') ? 'bg-green-500 col-start-1 col-span-1 row-span-1'
                            : (module.subject === 'CHE') ? 'bg-teal-500'
                            : (module.subject === 'PHY') ? 'bg-sky-500'
                            : (module.subject === 'MAT') ? 'bg-red-400'
                            : (module.subject === 'INT') ? 'bg-indigo-400'
                            : (module.subject === 'NEU') ? 'bg-rose-300'
                            : 'bg-slate-600'"> <a class="text-white text-bold justify-self-center absolute top-3" >i</a> </span> </button>
                         
           </div>
          </div>
        </div>
 

    
    
</template>


<script>

export default {
    name: 'Semester',
    props: {
        periods: Array,
        index: Intl,
        semesters: Array, 
        modules: Array,
        id: Intl


    },
    components: {
    },
    data() {
        return {

        }
    }
}
</script>