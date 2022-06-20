<template>
     
        <div class="absolute bottom-0 h-3/5 mx-auto mt-6 rounded-3xl   w-11/12">    
           <div v-for="(sem, index) in semesters" :key="index" class="grid  rounded-3xl relative overflow-hidden pt-2  bg-white mb-4 grid-cols-2 grid-rows-10" :class="((sem == this_semester)|| open) ? 'h-fit': 'h-10'">
                <a class="col-span-2 row-span-1 px-5 relative h-10 inline-block text-center border-b-4 text-xl"> Semester {{ sem }} <button @click="open=!open" class="absolute text-xl right-5 top-0.5"><a :class="open? 'rotate-180': ''">v</a></button></a> 
               
                <a v-for="(period, index) in periodInSemester(sem)" class="col-span-1 px-5 h-8  break-all inline-block font-bold text-center" :key="index">Period {{ period }}:</a>
            <ul class="col-span-1 w-full relative row-span-8 min-h-fit  " v-for="(period, index) in periodInSemester(sem)" :key="index">
                <li class="w-full text-center h-6 relative" :key="choice.id" v-for="choice in choices" v-show="(choice.selectionperiod==period)&&(choice.thissemester==sem)">
                <span class="w-full text-white -z-9 h-6  absolute left-0" :class="(choice.subject === 'BIO') ? 'bg-green-500  col-span-1 row-span-1'
                                    : (choice.subject === 'CHE') ? 'bg-teal-500'
                                    : (choice.subject === 'PHY') ? 'bg-sky-500'
                                    : (choice.subject === 'MAT') ? 'bg-red-400'
                                    : (choice.subject === 'INT') ? 'bg-indigo-400'
                                    : (choice.subject === 'NEU') ? 'bg-rose-300'
                        : (choice.subject === 'PRA') ? 'bg-slate-600'
                        :'bg-orange-500'" > 
                        
                <a class="absolute text-bold left-4" v-if="choice.prereq">!</a> <a v-else-if="choice.coreq" class="absolute text-bold left-4" >?</a><a v-else class="absolute text-bold left-4" ></a>
                {{ choice.subject }} {{choice.code}}
                <button class="absolute right-4" @click="removechoice(choice.id, choice.subject, choice.code, choice.start1, choice.end1, choice.start2, choice.end2, choice.start3, choice.end3, choice.period)"><a>&times;</a></button>
    </span></li></ul>
            </div> 
    </div>
</template>
<script>
export default {
    name:'Choice',
    props: {
        choices: Object,
        this_period: Number,
        this_semester: Number,
    },
  
    data() {
        return {
            semesters: [2, 3, 4, 5, 6],
            open: true

        }
},

        methods: {
            removechoice(id, subject, code, start1, end1, start2, end2, start3, end3, period) {
                this.$emit("deletechoice", id, subject, code, start1, end1, start2, end2, start3, end3, period)
            },
            periodInSemester(s) {
                if (s % 2 !== 0) {
                    const a = [1, 2]
                    return a
                }
                else {
                    const a = [4, 5]
                    return a
                }

            },
        }
    
    
}
</script>