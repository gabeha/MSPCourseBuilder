<template>
    
     <div class="bg-white text-white  grid grid-cols-1 grid-rows-7 top-6 mx-auto h-1/3 absolute  rounded-3xl  px-2   w-11/12">
        <div class="text-center w-full text-xl px-5 h-8  right-3 top-1"><h1 class="mx-auto block text-black  mb-7">REQUIREMENTS</h1></div>
        <div class="w-full mb-1 h-10 px-4 py-2 rounded-3xl" :class="(mathreq >= 1) ? 'bg-green-400'
    :'bg-gray-400'"><a class="tracking-tighter">Math courses:</a> <a class="float-right font-light tracking-tighter">{{ mathreq }} / min 1</a></div>
        <div class="w-full mb-1 h-10 px-4 py-2 rounded-3xl " :class="(lasreq >= 1) ? 'bg-green-400': 'bg-gray-400'"><a class="tracking-tighter">LAS courses:</a> <a class="float-right font-light tracking-tighter">{{ lasreq }} / min 1</a></div>
        <div class="w-full mb-1 h-10 px-4 py-2 rounded-3xl" :class="(intro <= 4) ? 'bg-gray-400'
    :'bg-red-400'"><a class="tracking-tighter">Introductory level courses:</a> <a class="float-right font-light tracking-tighter">{{ intro }} / max 4</a></div>
        <div class="w-full mb-1 h-10 px-4 py-2 rounded-3xl" :class="(introp <= 2) ? 'bg-gray-400'
                                                        :'bg-red-400'"><a class="tracking-tighter">Introductory level practicals:</a> <a class="float-right font-light tracking-tighter">{{ introp }} / max 2</a></div>
                <div class="w-full my-1 h-10 px-4 py-2 rounded-3xl" :class="(advanced>=4) ? 'bg-green-400': 'bg-gray-400'"><a class="tracking-tighter">Advanced level courses:</a> <a class="float-right font-light tracking-tighter">{{ advanced }} / min 4</a></div>
    <div class="w-full  mb-1 h-10 px-4 py-2 rounded-3xl" :class="(advancedp >= 2) ? 'bg-green-400'
    : 'bg-gray-400'"><a class="tracking-tighter">Advanced level practicals:</a> <a class="float-right font-light tracking-tighter">{{ advancedp }} / min 2</a></div>
       
    </div>
</template>
<script>


export default {
    name:'Reqs',
    props: {
        choices: Object,
        mathreq: Intl,
        lasreq: Intl,
        advanced: Intl,
        advancedp: Intl,
        intro: Intl,
        introp: Intl
    },
   
    
}
</script>