<template>
    <button @click="choose(id)"  class="relative m-3 h-9 w-36 min-w-min bg-white text-start rounded-full"
                    :class=" (subject === 'BIO') ? 'text-green-500  col-span-2 '
                                    : (subject === 'CHE') ? 'text-teal-500 col-span-2  '
                                    : (subject === 'PHY') ? 'text-sky-500 col-span-2  '
                                    : (subject === 'MAT') ? 'text-red-400 col-span-2 '
                                    : (subject === 'INT') ? 'text-indigo-400 col-span-2 '
                                    : (subject === 'NEU') ? 'text-rose-300 col-span-2 '
                                    :'text-slate-600 col-span-1'">
                                    <p class="font-bold h-16 mx-auto absolute left-0 top-0 text-s w-3/4 break-words text-leftinline"> {{subject}}{{code}} </p>
                              
                        <span class="w-1/4 h-9 block rounded-r-full absolute top-0 right-0 " :class="(subject === 'BIO') ? 'bg-green-500  col-span-1 row-span-1'
                                    : (subject === 'CHE') ? 'bg-teal-500'
                                    : (subject === 'PHY') ? 'bg-sky-500'
                                    : (subject === 'MAT') ? 'bg-red-400'
                                    : (subject === 'INT') ? 'bg-indigo-400'
                                    : (subject === 'NEU') ? 'bg-rose-300'
                                : 'bg-slate-600'"> 
                            <a class="text-white text-xl text-bold justify-self-center absolute top-3" >i</a>
                        </span> 
                    </button>
</template>

<script lang="ts">


export default {
    name: 'Button',
    props: {
        subject: String,
        code: Number, 
        id: Number       
    },
    methods: {
        choose(id) {
            this.$emit('select', id)
        }
    }
}
</script>
