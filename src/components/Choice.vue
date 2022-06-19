<template>
     <div class="bg-gray-200 inline right-0 top-56 h-1/2 fixed rounded-3xl p-8 m-3  w-3/12">    
           <div v-for="(semester, index) in semesters" :key="index" class="grid h-full  grid-cols-2">
           <a class="col-span-2">Semester {{ semester }}</a>
        <ul v-for="(period, index) in p" :key="index">
        Your selection for period {{ period }}:
        <li :key="choice.id" v-for="choice in choices" v-show="choice.period==period">{{ choice.subject }} {{choice.code}} <button class="float-right" @click="removechoice(choice.id, choice.subject, choice.code, choice.start1, choice.end1, choice.start2, choice.end2, choice.start3, choice.end3, choice.period)"><a>&times;</a></button></li>
        </ul>
            <!-- <button @click="removechoice(choice.id)" class="block text-white bg-slate-600 rounded-full p-3 m-3 w-1/3 mx-auto " v-for="choice in choices"  :key="choice.id">
              <a class="float-left text-white"> {{choice.code}}</a>
              <a class="absolute text-2xl text-bold text-white float-right">&times;</a>
        </button> -->
        </div> 
    </div>
</template>
<script>
export default {
    name:'Choice',
    props: {
        choices: Object,
        p: Intl
    },
  
    data() {
        return {
            periods: [],
            semesters: [1, 2, 3, 4, 5, 6]
        }
    },
    methods: {
        removechoice(id, subject, code, start1, end1, start2, end2, start3, end3, period) {
            this.$emit("deletechoice", id, subject, code, start1, end1, start2, end2, start3, end3, period)
        },
    //     periodInSemester() {
    //         for (semester in this.semesters){
    //         if (semester % 2 !== 0) {
    //             const a = [1, 2]
    //             this.periods = a
    //         }
    //         else {
    //             const a = [4, 5]
    //                 this.periods = a
    //         }    
    //     }
    // }
    }
    
}
</script>