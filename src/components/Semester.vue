<template>
    <div class="flex flex-col">
        <h5 class="font-medium leading-tight text-xl mt-0 mb-2 text-sky-600">Semester {{semesterNumber}}</h5>
        <div class="grid grid-cols-2 grid-rows-1 gap-2">
            <Period @period-clicked="passOn" @module-removed="moduleRemoved" :periodNumber="getPeriod()" :choices="choices" :semester="semesterNumber"></Period>
            <Period @period-clicked="passOn" @module-removed="moduleRemoved" :periodNumber="getPeriod()+1" :choices="choices" :semester="semesterNumber"></Period>
        </div>


    </div>
</template>

<script>
import Period from './Period.vue';
export default {
    name: "Semester",
    props: {
        semesterNumber: Number,
        choices: Array
    },
    components: { Period },
    methods: {
        getPeriod() {
            // why 2 and 5 are not handled in the same way?
            if (this.semesterNumber == 1 || this.semesterNumber == 3 || this.semesterNumber == 5) {
                return 1
            }
            else if (this.semesterNumber == 2 || this.semesterNumber == 4) {
                return 4
            }
        },
        passOn(periodNumber) {
            this.$emit('period-clicked', periodNumber, this.semesterNumber)
        },
        moduleRemoved(c) {
            this.$emit('module-removed', c)
        }
    }
}
</script>