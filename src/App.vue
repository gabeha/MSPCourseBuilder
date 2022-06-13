<template>
  <div class="flex flex-col justify-center items-center text-center h-96 flex-wrap">
    <div class="max-w-max my-1" v-for="m in modules" :key="m.id">
      <button 
      class="bg-slate-300 shadow-lg px-4 py-2 rounded-full hover:bg-slate-100" 
      @click="matchModules(m.id, m.subject, m.code, m.start1, m.end1, m.start2, m.end2, m.start3, m.end3)">
      {{m.subject}}{{m.code}}
      </button>
    </div>
  </div>

  <!-- <div class="flex flex-col justify-center items-center text-center h-96 flex-wrap">
    <div class="max-w-max my-1" v-for="m in courses" :key="m.id">
      <button 
      class="bg-sky-300 shadow-lg px-4 py-2 rounded-full hover:bg-sky-100" 
      @click="triggerRemoveCourse(m.id, m.subject, m.code, m.start1, m.end1, m.start2, m.end2)">
      {{m.subject}}{{m.code}}
      </button>
    </div>
    <div class="max-w-max my-1" v-for="m in practicals" :key="m.id">
      <button 
      class="bg-amber-300 shadow-lg px-4 py-2 rounded-full hover:bg-amber-100" 
      @click="triggerRemovePractical(m.id, m.subject, m.code, m.start1, m.end1)">
      {{m.subject}}{{m.code}}
      </button>
    </div>
  </div> -->
  <div v-for="(choice, index) in choices" :key="index">
    {{choice.subject}}{{choice.code}}
  </div>
</template>


<script>
import { supabase } from "./supabase.js"
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      modules: [],
      courses: [],
      practicals: [],
      choices: []
    }
  },
  mounted() {
    this.matchModules()
    // this.retrieveTest();
    this.fetchAllModules();
    // this.fetchAllCourses();
    // this.fetchAllPracticals();
  },
  methods: {
    async fetchAllCourses() {
      const response = await supabase
        .from('courses')
        .select()
      this.courses = response.data;
    },
    matchModules(id, subject, code, start1, end1, start2, end2, start3, end3) {
      if (subject == 'PRA') {
        this.modules = this.modules.filter(function(practical) {
         return practical.subject !== 'PRA'
        })
        this.modules = this.modules.filter(function(course){

          const rc1 = moment.range(course.start1, course.end1)
          const rc2 = moment.range(course.start2, course.end2)

          const rp1 = moment.range(start1, end1)
          // console.log(start2!==null)
          if (start3 !== null) {
            const rp2 = moment.range(start2, end2);
            const rp3 = moment.range(start3, end3);

            console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)) 
            || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))

            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)) 
            || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))
          }
          if ((start3 == null) && (start2 !== null)) {
            const rp2 = moment.range(start2, end2);

            // console.log((rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            // console.log((rc1.overlaps(rp2) || rc2.overlaps(rp2)))

            console.log((!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))))
          
            return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)))

            // return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            // || (rc1.overlaps(rp2) || rc2.overlaps(rp2)))
          }
          if (start2 == null) {
            // console.log(rp1)
            // console.log(rc2.overlaps(rp1))
            console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
          }
        })
      }
      else {
        this.modules = this.modules.filter(function(course) {
          const rc1 = moment.range(course.start1, course.end1)
          const rc2 = moment.range(course.start2, course.end2)

          const rp1 = moment.range(start1, end1);
          const rp2 = moment.range(start2, end2);

          return (!(rc1.overlaps(rp1) || rc1.overlaps(rp2)) || !(rc2.overlaps(rp1) || rc2.overlaps(rp2)))
        })

        this.modules = this.modules.filter(function(course){

          const rc1 = moment.range(start1, end1)
          const rc2 = moment.range(start2, end2)

          const rp1 = moment.range(course.start1, course.end1)
          // console.log(start2!==null)
          if (course.start3 !== null) {
            const rp2 = moment.range(course.start2, course.end2);
            const rp3 = moment.range(course.start3, course.end3);

            console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)) 
            || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))

            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)) 
            || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))
          }
          if ((course.start3 == null) && (course.start2 !== null)) {
            const rp2 = moment.range(course.start2, course.end2);

            // console.log((rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            // console.log((rc1.overlaps(rp2) || rc2.overlaps(rp2)))

            console.log((!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))))
          
            return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)))

            // return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            // || (rc1.overlaps(rp2) || rc2.overlaps(rp2)))
          }
          if (course.start2 == null) {
            // console.log(rp1)
            // console.log(rc2.overlaps(rp1))
            console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
          }
        })
      }
      this.addChoice(id, subject, code);
    },
    async fetchAllPracticals() {
      const response = await supabase
        .from('practicals')
        .select()
      this.practicals = response.data;
    },
    async fetchAllModules() {
      const response = await supabase
        .from('modules')
        .select()
      this.modules = response.data;
      this.modules.forEach(element => {
        element.start1 = new Date(element.start1);
        element.end1 = new Date(element.end1);
        if (element.start2 != null) {
          element.start2 = new Date(element.start2);
          element.end2 = new Date(element.end2);
        }
        if (element.start3 != null) {
          element.start3 = new Date(element.start3);
          element.end3 = new Date(element.end3);
        }
      });
      console.log(this.modules)
    },
    addChoice(id, subject, code) {
      const choice = {
        id: id,
        subject: subject,
        code: code
      };
      this.choices = [...this.choices, choice]
      // console.log(this.choices);
    },
  }
}
</script>
