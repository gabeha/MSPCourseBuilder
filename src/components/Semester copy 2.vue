<template>
    <Toggle @togg="periodInSemester" />
    <Choice />
    <div class="grid gap-4 grid-cols-2 grid-flow-col-dense  w-3/4 bg-white rounded-3xl truncate mx-auto p-8">
        <div  v-for="(period, index) in periods" :key="index"  class="relative block h-fit rounded-3xl  w-full" :class="(period == 1) ? 'bg-gray-200 col-start-1 col-span-1 row-start-3 row-span-1'
                                        :(period == 2) ? 'bg-gray-200 row-start-3 col-start-2 col-span-1 '
                                        :(period == 4) ? 'bg-gray-200 row-start-3 col-start-1 col-span-1 row-span-1 '
                                        : 'bg-gray-200 row-start-3 col-start-2 col-span-1 row-span-1 '">
                <h2 class="text-black rounded-t-xl text-center tracking-widest">PERIOD {{ period }}</h2>
              
      
       <div class="grid grid-cols-2 rounded-3xl grid-flow-row-dense ">         
              <button class="relative block pr-70 bg-white text-start pr-8 rounded-full m-3 h-12 min-w-28 " v-for="module in modules" :key="module.id" 
              :class=" (module.subject === 'BIO') ? 'text-green-500  order-1 '
                            : (module.subject === 'CHE') ? 'text-teal-500 order-2 '
                            : (module.subject === 'PHY') ? 'text-sky-500 order-3 '
                            : (module.subject === 'MAT') ? 'text-red-400 order-4'
                            : (module.subject === 'INT') ? 'text-indigo-400 order-5'
                            : (module.subject === 'NEU') ? 'text-rose-300 order-6 '
                            :'bg-slate-600 order-last'" @click="matchModules(module.id, module.subject, module.code, module.start1, module.end1, module.start2, module.end2, module.start3, module.end3)">
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
import Toggle from './Toggle.vue'
import Choice from './Choice.vue'
export default {
    name: 'Semester',
    props: {
       
        index: Intl,
        modules: Array,
   


    },
    components: {
        Toggle,
        Choice
    },
    data() {
        return {
            periods:[1, 2]
        }
    },
    methods: {
       periodInSemester(count) {
            if (count % 2 !== 0) {
                const a = [1, 2]
                this.periods = a
                
            }
            else {
                const a = [4, 5]
                this.periods = a

            }
        }
    }, 
   
    }

</script>