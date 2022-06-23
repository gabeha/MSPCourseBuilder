<template>
        <div class="w-full flex flex-col my-4" v-for="p in this.choices" :key="p.selectedModule.id">
            <div class="flex flex-col items-center">
                <h1 class="font-medium leading-tight text-5xl mt-2 mb-2 text-gray-600">{{p.selectedModule.description.title}}</h1>
                <h4 class="font-thin leading-tight text-3xl mt-0 mb-4 text-gray-600">{{p.selectedModule.subject}}{{p.selectedModule.code}}</h4>
            </div>
            <div class="grid grid-cols-2 grid-rows-1 gap-4 mx-4">
                <div class=" bg-white rounded-lg shadow-xl mx-auto flex flex-col px-7 py-3">
                    <h3 class="self-center font-medium leading-tight text-3xl mt-0 mb-2 text-amber-600">Course Information</h3>
                    <h5 class="font-medium leading-tight text-xl mt-0 mb-2 text-amber-600">Course Coordinator(s)</h5>
                    <ul>
                        <li class="ml-6">
                            {{p.selectedModule.description.course_coordinator}}
                        </li>
                    </ul>
                    <h5 class="font-medium leading-tight text-xl mt-0 mb-2 text-amber-600">Pre-requisites</h5>
                    <ul class="list-disc">
                        <li class="ml-6" v-for="(o, index) in p.selectedModule.description.pre_requisites" :key="index">
                            {{o}}
                        </li>
                    </ul>
                    <h5 class="font-medium leading-tight text-xl mt-0 mb-2 text-amber-600">Recommended</h5>
                    <ul>
                        <li class="ml-6">
                            {{p.selectedModule.description.Recommended}}
                        </li>
                    </ul>
                    <h5 class="font-medium leading-tight text-xl mt-0 mb-2 text-amber-600">Objectives</h5>
                    <ul class="list-disc">
                        <li class="ml-6 text-justify" v-for="(o, index) in p.selectedModule.description.objectives" :key="index">
                            {{o}}
                        </li>
                    </ul>
                    <h5 class="font-medium leading-tight text-xl mt-0 mb-2 text-amber-600">Literature</h5>
                    <ul class="list-disc">
                        <li class="ml-6 text-justify" v-for="(o, index) in p.selectedModule.description.literature" :key="index">
                            {{o}}
                        </li>
                    </ul>
                    <h5 class="font-medium leading-tight text-xl mt-0 mb-2 text-amber-600">Format</h5>
                    <ul>
                        <li class="ml-6">
                            {{p.selectedModule.description.format}}
                        </li>
                    </ul>
                    <h5 class="font-medium leading-tight text-xl mt-0 mb-2 text-amber-600">Assessment</h5>
                    <ul>
                        <li class="ml-6">
                            {{p.selectedModule.description.assessment}}
                        </li>
                    </ul>
                </div>
                <div class=" bg-white rounded-lg shadow-xl mx-auto flex flex-col px-7 py-2">
                    <h3 class="self-center font-medium leading-tight text-3xl mt-0 mb-2 text-amber-600">Course Description</h3>
                    <p class="font-normal text-lg text-justify">{{p.selectedModule.description.description}}</p>
                </div>
            </div>
        </div>
 


</template>

<script>
export default {
    name: 'Manual',
    props: {
        choices: Array 
    },
    mounted() {

    },
    
}
</script>