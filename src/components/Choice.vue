<template>
     <div class="bg-gray-200 inline right-0 top-56 h-full fixed rounded-3xl p-8 m-3  w-3/12">    
           <div class="grid h-full  grid-cols-2">
        <ul v-for="(period, index) in periods" :key="index">
        Your selection for period {{period}}:
        <li :key="choice.id" v-for="choice in choices" v-show="choice.period==period">{{ choice.subject }} {{choice.code}} </li>
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
            
            

        }
    },
    methods: {
        removechoice(id) {
            this.$emit("deletechoice", id)
        },
        periodInSemester() {
            for (semester in semesters){
            if (semester % 2 !== 0) {
                const a = [1, 2]
                this.periods = a
            }
            else {
                const a = [4, 5]
                    this.periods = a
            }    
        }
    }
    }
    
}
</script>