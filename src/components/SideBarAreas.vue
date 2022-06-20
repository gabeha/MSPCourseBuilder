<template>
<div id="accordion-collapse" data-accordion="collapse" data-active-classes="hover:bg-amber-600 rounded-md pl-4 pr-3" >
  <h2 :id="'accordion-collapse-heading-'+title">
    <button type="button" class="flex justify-between items-center p-2.5 w-full  text-left cursor-pointer text-white hover:bg-amber-600 rounded-md pl-4 pr-3" :data-accordion-target="'#accordion-collapse-body-'+title"  aria-expanded="false" :aria-controls="'#accordion-collapse-body-'+title">
    <i :class=" icon + ' text-sm left-0'"></i>
      <span>{{title}} Courses</span>
      <svg data-accordion-icon class="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
  </h2>
  <div :id="'accordion-collapse-body-'+title" class="hidden" :aria-labelledby="'accordion-collapse-heading-'+title">
    <div>
      <p class="cursor-pointer p-2 hover:bg-gray-500 rounded-md mt-1 text-white">PHY2001 - Classical Mechanics</p>
    </div>
  </div>
</div>




</template>

<script>
import Buttons from './Buttons.vue'

export default{
    name:'sidebarareas',
    
    components:{
        Buttons,
    },
    props:{
        title:String,
        toggleCourse:Boolean,
        icon:String,
    },
    methods:{

    }
}
</script>