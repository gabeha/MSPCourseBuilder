<template>
    <button v-for="module in modules" :key="module.id" @click="choose(module)"  
    class="relative m-3 h-9 w-36 min-w-min bg-white text-start rounded-full"
                    :class=" (module.subject === 'BIO') ? 'text-green-500  col-span-2 '
                                    : (module.subject === 'CHE') ? 'text-teal-500 col-span-2  '
                                    : (module.subject === 'PHY') ? 'text-sky-500 col-span-2  '
                                    : (module.subject === 'MAT') ? 'text-red-400 col-span-2 '
                                    : (module.subject === 'INT') ? 'text-indigo-400 col-span-2 '
                                    : (module.subject === 'NEU') ? 'text-rose-300 col-span-2 '
                                    :'text-slate-600 col-span-1'">
                                    <p class="font-bold h-16 mx-auto absolute left-0 top-0 text-s w-3/4 break-words text-leftinline"> {{module.subject}}{{module.code}} </p>
                              
                        <span class="w-1/4 h-9 block rounded-r-full absolute top-0 right-0 " :class="(module.subject === 'BIO') ? 'bg-green-500  col-span-1 row-span-1'
                                    : (module.subject === 'CHE') ? 'bg-teal-500'
                                    : (module.subject === 'PHY') ? 'bg-sky-500'
                                    : (module.subject === 'MAT') ? 'bg-red-400'
                                    : (module.subject === 'INT') ? 'bg-indigo-400'
                                    : (module.subject === 'NEU') ? 'bg-rose-300'
                                : 'bg-slate-600'"> 
                            <a class="text-white text-xl text-bold justify-self-center absolute top-5" >i</a>
                        </span> 
                    </button>
</template>

<script lang="ts">


export default {
    name: 'Button',
    props: {
        modules: Object,
             
    },

    methods: {
        choose(selected) {
            this.$emit('select', selected)
        }
    }
}
</script>
