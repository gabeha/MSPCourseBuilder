<template>
<div class="p-t-8 px-8 mt-8">
    <div class= "w-3/4 mx-auto px-5 trunicate text-center rounded-t-3xl h-24 bg-green-500">
        <button @click="(count > 1) ? count-- : count ; nextPeriodSemester()" class=" text-black float-left  text-xl font-bold"> &lt; </button>
        <h1 class="text-xl text-white font-bold">SEMESTER {{ semester }} Period: {{ periods }} count {{ count }}</h1>
        <button @click="(count < 6) ? count++ : count ; nextPeriodSemester()" class="float-right text-xl text-black font-bold "> > </button>
    </div>        
 </div>

    
    
</template>


<script>
export default {
    name: 'Toggle',
    props: {
        index: Intl,
        modules: Array,
    

    },
   
    data() {
        return {
            count: 1,
            periods: 1,
            semester: 1
        }
    },
    // mounted() {
    //     this.nextPeriodSemester()
    // },

    methods: {
        // periodToggle(count) {
        //     this.$emit("togglePeriod", count)
        // }
        nextPeriodSemester() { 
            let s = this.semester;
            if (s < 6) {
                let c = this.count;
                if (c == 1) {
                    this.periods = 1;
                } else if (c == 2) {
                    this.periods = 2
                } else if (c == 3) {
                    this.semester++
                    this.periods = 4
                    this.count = 4
                } else if (c == 4) {
                    this.periods = 4
                } else if (c == 5) {
                    this.periods = 5
                } else {
                    this.semester++
                    this.periods = 1
                    this.count = 1
                }
            } else {
                this.semester = 6
                 if (c == 4) {
                    this.periods = 4
                    } else {
                        this.periods = 5
                    }
            }
        }
    }
    }


</script>