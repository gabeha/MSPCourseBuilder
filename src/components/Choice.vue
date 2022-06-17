<template>
     <div class="bg-gray-200 -z-50 inline right-0 top-56 h-3/5 truncate fixed rounded-3xl p-8 m-3  w-3/12">    
           <div class="grid h-full gap-4 grid-cols-2">
        <ul v-for="(period, index) in periods" :key="index" class=" col-span-1 list-inside">
        Your selection for period {{period}}:
        <li class="bg-white py-1 m-1 rounded-full " :key="choice.id" v-for="choice in choices" v-show="choice.period==period">{{ choice.subject }} {{choice.code}} <button @click="removechoice(choice.id)" class="float-right mr-8"><a>&times;</a></button></li>
        </ul>
            
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
            periods:[1, 2, 4, 5]
            

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