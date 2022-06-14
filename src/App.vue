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

/*
--------------------------------------------------------------------------------------------
@requires: all modules available for selection (provided by calling it on fetchAllModules())

@requires: all of the column entries of the module that user selects, specifically id in the data table, 
subject(PRA/NEU/MAT/etc.), code(1011/3008/etc.), and start-end time pairs in Date format,
where each pair corresponds to day of the week and the specific timeslot 
(i.e. 2022-06-14 8:30, 2022-06-14 10:30 which corresponds to Monday morning slot)

@returns:  all of the options available after the selection has been made

TODO: assert that no more than two practicals can be available for selection
TODO: refactor! the functions used for filtering can be extracted to improve readability
*/

    matchModules(id, subject, code, start1, end1, start2, end2, start3, end3) {

      // ----- Scenario 1: Practical was selected, show all courses available for selection

      if (subject == 'PRA') {

        // Step 1: remove all other practicals from availability list
        this.modules = this.modules.filter(function(practical) {
         return practical.subject !== 'PRA'
        })
        // Step 2: compare timeslot for each course in the availability list and remove overalapping ones
        this.modules = this.modules.filter(function(course){

          // get timeslots for the course in the table of available courses 
          const rc1 = moment.range(course.start1, course.end1)
          const rc2 = moment.range(course.start2, course.end2)

          // get the timeslot for the first day when the practical is offered
          const rp1 = moment.range(start1, end1)

          // console.log(start2!==null)

          // if practical is offered on three days (i.e Monday, Tuesday or Wednesday) 
          if (start3 !== null) {

            // get the timeslots for the second and third days when the practical is offered
            const rp2 = moment.range(start2, end2);
            const rp3 = moment.range(start3, end3);

            console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)) 
            || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))

            // check all three practical days against both course days
            // if all overlap -> filter the course out
            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)) 
            || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))
          }

          // if practical is offered on two days (i.e Monday or Wednesday) 
          if ((start3 == null) && (start2 !== null)) {

            // get the timeslot for the second day when the practical is offered
            const rp2 = moment.range(start2, end2);

            // console.log((rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            // console.log((rc1.overlaps(rp2) || rc2.overlaps(rp2)))

            console.log((!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))))
          
            // check all both practical days against both course days
            // if all overlap -> filter the course out
            return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)))

            // return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            // || (rc1.overlaps(rp2) || rc2.overlaps(rp2)))
          }

          // if practical is only offered on one day
          if (start2 == null) {
            // console.log(rp1)
            // console.log(rc2.overlaps(rp1))

            // check if practical overlaps with course days
            // if both overlap -> filter course out
            console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
          }
        })
      }

      // ----- Scenario 2: Course was selected, show all practicals and courses available for selection
      else {

        // show all available courses
        this.modules = this.modules.filter(function(course) {

        // get timeslots for the course from the list of available courses
          const rc1 = moment.range(course.start1, course.end1)
          const rc2 = moment.range(course.start2, course.end2)

        // get timeslots of the course that was selected (input course)
          const rp1 = moment.range(start1, end1);
          const rp2 = moment.range(start2, end2);

          // if at least one timeslot overlaps -> remove course
          return (!(rc1.overlaps(rp1) || rc1.overlaps(rp2)) || !(rc2.overlaps(rp1) || rc2.overlaps(rp2)))
        })

        // show all available practicals
        this.modules = this.modules.filter(function(course){

          // get timeslots of the course that was selected (input course)
          const rc1 = moment.range(start1, end1)
          const rc2 = moment.range(start2, end2)

           // get the timeslot for the first day when the practical is offered
          const rp1 = moment.range(course.start1, course.end1)
          // console.log(start2!==null)

          // EXACTLY THE SAME AS FILTERING ABOVE --> SHOULD BE ABSTRACTED INTO SEPARATE FUNCTION 
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
            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            console.log("I can't push shit to a remote branch if only comments were added :c --Liza")
            const removable  = 2;
          }
        })
      }
      this.addChoice(id, subject, code);
    },
//--------------------------------------------------------------------------------------------

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
