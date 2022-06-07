<template>
<div class="mx-40">
    <div class="grid grid-cols-3 text-center">
      <div>
        <h1 class="font-bold text-lg m-4">First Course Choice</h1>
        <div class="flex flex-wrap justify-center items-center overflow-auto">
          <div v-for="course in courses" :key="course.course_id" >
            <button :class = "(course.subject === 'BIO')?'bg-green-300'
                              : (course.subject === 'CHE')?'bg-gray-300'
                              : (course.subject === 'HUM')?'bg-purple-300'
                              : (course.subject === 'INT')?'bg-cyan-300'
                              : (course.subject === 'MAT')?'bg-red-300'
                              : (course.subject === 'PHY')?'bg-blue-300'
                              : (course.subject === 'NEU')?'bg-orange-300'
                              :'bg-slate-50'"         
            
            class="outline-none rounded-md shadow-md m-1 px-3 py-1 hover:bg-slate-200 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-600" @click="getAvailableCourses(course.course_id)">{{course.subject}}{{course.code}}</button>
          </div>
        </div>
      </div>

      
        <div>
          <h1 class="font-bold text-lg m-4">Second Course Choice</h1>
          <div class="flex flex-wrap justify-center items-center overflow-auto">
            <TransitionGroup name="list" tag="ul" class="flex flex-wrap justify-center items-center overflow-hidden">
              
              <div v-for="course in available_courses" :key="course.f_course_id">
              <button class="bg-slate-50 outline-none rounded-md shadow-md m-1 px-3 py-1 hover:bg-slate-200 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-600" @click="getAvailablePracticals(course.f_course_id)">{{course.f_subject}}{{course.f_code}}</button>
            </div>
              
            </TransitionGroup>
          </div>
        </div>

      <div>
        <h1 class="font-bold text-lg m-4">Practical Choice</h1>
        <div class="flex flex-wrap justify-center items-center overflow-auto">
        <div v-for="practical in practicals" :key="practical.f_practical_id">
          <button class="bg-slate-50 outline-none rounded-md shadow-md m-1 px-3 py-1 hover:bg-slate-200 active:bg-slate-300 focus:outline-none focus:ring focus:ring-slate-600" @click="logChoices(practical.f_practical_id)">{{practical.f_subject}}{{practical.f_code}}</button>
        </div>
        </div>
        </div>  
  </div>

  <div class="flex justify-center items-center flex-col">
    <h1 class="font-bold text-lg m-4">Your choices:</h1>
    <div v-for="course in chosen_courses" :key="course.course_id">
        <div>
          <h3>{{course.subject}}{{course.code}}</h3>
        </div>
    </div>
    <div v-for="practical in chosen_practicals" :key="practical.practicals_id">
        <div>
          <h3>{{practical.subject}}{{practical.code}}</h3>
        </div>
    </div>

  </div>
</div>
</template>

<script>
// import { ref } from "vue"
import { supabase } from "./supabase.js"


export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      chosen_block: 1,
      block_id_1: null,
      block_id_2: null,
      course_id_1: null,
      course_id_2: null,
      practical_id: null,
      courses: [],
      available_courses: [],
      practicals: [],

      chosen_courses: [],
      chosen_practicals: []
    }
  },
  mounted() {
    this.fetchAllCourses();
    
  },
  methods: {
    async fetchAllCourses() {
      const response = await supabase
        .from('courses')
        .select()
      this.courses = response.data
      this.courses.sort((a, b) => a.subject.localeCompare(b.subject))

      console.log(this.courses)
    },
    async getAvailableCourses(course_id) {
      this.course_id_1 = course_id;
      const response_block = await supabase
        .from('courses_join_practicals')
        .select('block_id')
        .eq('course_id', course_id);

      this.block_id_1 = response_block.data[0].block_id;

      // console.log(this.block_id_1)

      const response_courses = await supabase.rpc(`courses_${this.block_id_1}`);
      this.available_courses = response_courses.data;
      this.available_courses.sort();
      // console.log(this.available_courses)
    },
    async getAvailablePracticals(course_id) {
      this.course_id_2 = course_id;
      const response_block = await supabase
        .from('courses_join_practicals')
        .select('block_id')
        .eq('course_id', course_id);

      // console.log(response_block)
      this.block_id_2 = response_block.data[0].block_id;

      // console.log(this.block_id_2)

      if (this.block_id_1 < this.block_id_2) {
        const response = await supabase.rpc(`practicals_${this.block_id_1}_${this.block_id_2}`);
        this.practicals = response.data;
      }
      else {
        const response = await supabase.rpc(`practicals_${this.block_id_2}_${this.block_id_1}`);
        this.practicals = response.data;
      }

      console.log(this.practicals)
    },
    async logChoices(practical_id) {
      this.practical_id = practical_id;
      const response_c = await supabase
        .from('courses')
        .select()
        .or(`course_id.eq.${this.course_id_1}, course_id.eq.${this.course_id_2}`)

      // console.log(response_c)
      this.chosen_courses = response_c.data;

      const response_p = await supabase
        .from('practicals')
        .select()
        .eq('practical_id', this.practical_id)

      this.chosen_practicals = response_p.data;

      // console.log(this.chosen_courses)
      console.log(this.chosen_practicals)
    }
    }
  }
</script>

<style>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>