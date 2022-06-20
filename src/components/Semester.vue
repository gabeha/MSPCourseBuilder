<template>
    <div class="grid gap-4 grid-cols-3 grid-flow-row-dense md:gridcols-2 w-3/4 bg-white rounded-3xl truncate  p-8" >
        <div class="relative block h-14 rounded-3xl w-full bg-gray-100 py-2 col-span-3  row-span-1">
                <h2 class="text-black rounded-t-xl text-2xl text-center tracking-widest" >PERIOD  {{ this_period }} </h2>
        </div>  
         
            <div :class="(subject == 'PRA') ? 'col-span-3' : 'col-span-1'" class="bg-gray-100 m-3  rounded-3xl" v-for="(subject, index) in sub" :key="index">
                <button  class="h-12 m-3 rounded-full text-xl relative -top-4 w-full text-center bg-gray-200 mx-auto">
                    {{ subject }} 
                </button>       
                <div class="grid grid-cols-4"> 
                    <button  v-for="module in modules" v-show="module.subject == subject && module.period == this_period" :key="module.id" 
                    class="relative m-3 h-9 w-10/12 min-w-min bg-white text-start rounded-full"
                    :class=" (module.subject === 'BIO') ? 'text-green-500  col-span-2 '
                                    : (module.subject === 'CHE') ? 'text-teal-500 col-span-2  '
                                    : (module.subject === 'PHY') ? 'text-sky-500 col-span-2  '
                                    : (module.subject === 'MAT') ? 'text-red-400 col-span-2 '
                                    : (module.subject === 'INT') ? 'text-indigo-400 col-span-2 '
                                    : (module.subject === 'NEU') ? 'text-rose-300 col-span-2 '
                                    :'text-slate-600 col-span-1'" @click="makeChoice(module.id, module.subject, module.code, module.start1, module.end1, module.start2, module.end2, module.start3, module.end3, module.period, module.hascorec, module.hasprerec)">
                                    <p class="font-bold h-16 mx-auto absolute left-0 top-0 text-s w-3/4 break-words text-leftinline"> {{module.subject}}{{module.code}} {{module.hascorec}} </p>
                              
                        <span class="w-1/4 h-9 block rounded-r-full absolute top-0 right-0 " :class="(module.subject === 'BIO') ? 'bg-green-500  col-span-1 row-span-1'
                                    : (module.subject === 'CHE') ? 'bg-teal-500'
                                    : (module.subject === 'PHY') ? 'bg-sky-500'
                                    : (module.subject === 'MAT') ? 'bg-red-400'
                                    : (module.subject === 'INT') ? 'bg-indigo-400'
                                    : (module.subject === 'NEU') ? 'bg-rose-300'
                                : 'bg-slate-600'"> 
                            <a class="text-white text-xl text-bold justify-self-center absolute top-3" >i</a>
                        </span> 
                    </button>
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
        index: Number,
        modules: Object,
        this_period: Number, 
        this_semester: Number,
    
    },
    components: {
        Toggle,
        Choice
    },
    data() {
        return {
            sub: ['BIO', 'CHE', 'PHY', 'INT', 'NEU', 'MAT', 'PRA'],
        }
    },
    methods: {
        makeChoice(id, subject, code, start1, end1, start2, end2, start3, end3, period, coreq, prereq) {
            this.$emit("makechoice", id, subject, code, start1, end1, start2, end2, start3, end3, period, coreq, prereq)
        },
    }
}

</script>