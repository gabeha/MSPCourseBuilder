<template>
     
        <div class="bg-white  absolute bottom-6 h-3/5  rounded-3xl p-4 mx-auto  w-11/12">    
           <div v-for="(sem, index) in semesters" :key="index" class="grid rounded-3xl  p-4  mb-4 grid-cols-2" :class="(choice.semester in semesters)? 'bg-gray-800': 'bg-green-500'">
                <h1 class="col-span-2"> Semester {{ semester }}</h1> 
                <ul class="col-span-1" v-for="(period, index) in periodInSemester(semester)" :key="index">
                Your selection for period {{ period }}:
        <li :key="choice.id" v-for="choice in choices" v-show="choice.selectionperiod==period">{{ choice.subject }} {{choice.code}}} <button class="float-right" @click="removechoice(choice.id, choice.subject, choice.code, choice.start1, choice.end1, choice.start2, choice.end2, choice.start3, choice.end3, choice.period)"><a>&times;</a></button></li>
        </ul>
            
        </div> 
    </div>
</template>
<script>
export default {
    name:'Choice',
    props: {
        choices: Object,
        this_period: Intl,
        semester: Intl,
    },
  
    data() {
        return {
            semesters: [2, 3, 4, 5, 6]

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