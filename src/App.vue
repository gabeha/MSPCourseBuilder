<template>
  <div>
    <Toggle @nextperiod="nextPeriodSemester" @lastperiod="previousPeriodSemester" :period="p" :semester="semester" />
    <Semester :modules='modules' :p="p" @makechoice="matchModules"  />
    <Choice :p="p" :choices='choices' @deletechoice="deleteChoice"  />
    <!-- <div class="w-4/5 bg-gray-200 rounded-3xl mx-auto p-8">
        <div class="grid grid-cols-7  grid-flow-col-dense justify-between mx-auto">         
              <button class="relative block pr-70 bg-white  text-start pr-8 rounded-full m-3 h-12 w-32" v-for="module in modules" :key="module.id" 
              :class=" (module.subject === 'BIO') ? 'text-green-500 col-start-1 col-span-1 row-span-1 order-1'
                            : (module.subject === 'CHE') ? 'text-teal-500 :hover col-start-2 col-span-1 row-start-auto  order-2'
                            : (module.subject === 'PHY') ? 'text-sky-500 col-start-3 col-span-1 row-start-auto order-3'
                            : (module.subject === 'MAT') ? 'text-red-400 col-start-4 col-span-1 row-start-auto order-4'
                            : (module.subject === 'INT') ? 'text-indigo-400 col-start-5 col-span-1 row-start-auto order-5'
                            : (module.subject === 'NEU') ? 'text-rose-300 col-start-6 col-span-1 row-start-auto order-6 inline'
                            :'bg-slate-600 col-start-7 col-span-1 order-last'" @click="matchModules(module.id, module.subject, module.code, module.start1, module.end1, module.start2, module.end2, module.start3, module.end3)">
                            <p class="font-bold mx-auto  text-xs inline"> {{module.subject}} {{module.code}} </p>
                             
                            <span @mouseover="displayInfo" class="w-10 h-12 inline-block rounded-r-full -my-3 absolute right-0" :class="(module.subject === 'BIO') ? 'bg-green-500 col-start-1 col-span-1 row-span-1'
                            : (module.subject === 'CHE') ? 'bg-teal-500'
                            : (module.subject === 'PHY') ? 'bg-sky-500'
                            : (module.subject === 'MAT') ? 'bg-red-400'
                            : (module.subject === 'INT') ? 'bg-indigo-400'
                            : (module.subject === 'NEU') ? 'bg-rose-300'
                            : 'bg-slate-600'"> <a class="text-white text-bold justify-self-center absolute top-3" >i</a> </span> </button>
                            <div v-show="active" class="bg-white w-20"> ola </div>
           
          <div class="block col-span-7 col-start-1 bg-white rounded-2xl p-8 m-3 w-full">
            <h1>YOUR CHOICES FOR PERIOD 4:</h1>
            <button @click="deleteChoice(choice.id)" class="inline-block text-white bg-slate-600 rounded-full p-3 m-3 w-1/5 mx-auto " v-for="choice in choices" :key="choice.id">
              <a class="float-left">{{choice.subject}}{{choice.code}}  </a>
              <a class="absolute text-2xl text-bold text-white -my-2 mx-2"  @click="console.log('hello')">&times;</a>
            </button>
          </div></div>
    </div> -->
    </div>
</template>


<script>
import { supabase } from "./supabase.js"
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Semester from './components/Semester.vue';
import Toggle from './components/Toggle.vue'
import Choice from './components/Choice.vue'

const moment = extendMoment(Moment);
export default {
  name: 'App',
  components: {
    Semester,
    Toggle,
    Choice
  },
  data() {
    return {
      modules: [],
      courses: [],
      practicals: [],
      choices: [],
      active: true,
      unavailable: [],
      all: [],
      p: 1,
      semester: 1,
    }
  },

  mounted() {
    // this.matchModules()
    // this.retrieveTest();
    this.fetchAllModules();
    this.fetchAllPracticals();
    this.fetchAllCourses();

   
    // this.previousPeriodSemester()
    // this.nextPeriodSemester()

  },
  methods: {
    async fetchAllCourses() {
      const response = await supabase
        .from('courses')
        .select()
      this.courses = response.data;
      // console.log(this.courses)
    },
    addChoice(id, subject, code, start1, end1, start2, end2, start3, end3, period) {
      const choice = {
        id: id,
        subject: subject,
        code: code,
        start1: start1,
        end1: end1,
        start2: start2,
        end2: end2,
        start3: start3,
        end3: end3,
        period: period
      };
      this.choices = [...this.choices, choice]

    },
    matchModules(id, subject, code, start1, end1, start2, end2, start3, end3, period) {
      const p = this.p
      if (subject == 'PRA') {
        this.modules = this.modules.filter(function (practical) {
          return practical.subject !== 'PRA' || practical.period!==p
        })
        this.modules = this.modules.filter(function (course) {
          const rc1 = moment.range(course.start1, course.end1)
          const rc2 = moment.range(course.start2, course.end2)
          const rp1 = moment.range(start1, end1)
          // console.log(start2!==null)
          if (start3 !== null) {
            const rp2 = moment.range(start2, end2);
            const rp3 = moment.range(start3, end3)
            // console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
            //   || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))
            //   || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))
            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
              || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))
              || !(rc1.overlaps(rp3) || rc2.overlaps(rp3))|| course.period!==p)
          }
          if ((start3 == null) && (start2 !== null)) {
            const rp2 = moment.range(start2, end2);
            // console.log((rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            // console.log((rc1.overlaps(rp2) || rc2.overlaps(rp2)))
            // console.log((!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
            //   || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))))

            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
              || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))|| course.period!==p)
            // return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            // || (rc1.overlaps(rp2) || rc2.overlaps(rp2)))
          }
          if (start2 == null) {
            // console.log(rp1)
            // console.log(rc2.overlaps(rp1))
            // console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))

            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) || course.period!==p)
          }
        })
      }
      else {
        this.modules = this.modules.filter(function (course) {
          const rc1 = moment.range(course.start1, course.end1)
          const rc2 = moment.range(course.start2, course.end2)
          const rp1 = moment.range(start1, end1);
          const rp2 = moment.range(start2, end2);
          return (!(rc1.overlaps(rp1) || rc1.overlaps(rp2)) || !(rc2.overlaps(rp1) || rc2.overlaps(rp2))|| course.period!==p)
        })
        this.modules = this.modules.filter(function (course) {
          const rc1 = moment.range(start1, end1)
          const rc2 = moment.range(start2, end2)
          const rp1 = moment.range(course.start1, course.end1)
          // console.log(start2!==null)
          if (course.start3 !== null) {
            const rp2 = moment.range(course.start2, course.end2);
            const rp3 = moment.range(course.start3, course.end3);
            // console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
            //   || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))
            //   || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))
            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
              || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))
              || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)) || course.period!==p)
          }
          if ((course.start3 == null) && (course.start2 !== null)) {
            const rp2 = moment.range(course.start2, course.end2);
            // console.log((rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            // console.log((rc1.overlaps(rp2) || rc2.overlaps(rp2)))
            // console.log((!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
            //   || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))))

            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
              || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)) || course.period!==p)
            // return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            // || (rc1.overlaps(rp2) || rc2.overlaps(rp2)))
          }
          if (course.start2 == null) {
            // console.log(rp1)
            // console.log(rc2.overlaps(rp1))
            // console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) || course.period!==p)
          }
        })
      }
      this.addChoice(id, subject, code, start1, end1, start2, end2, start3, end3, period)
 
    },
    async fetchAllPracticals() {
      const response = await supabase
        .from('practicals')
        .select()
      this.practicals = response.data;
      console.log(this.practicals)
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

    },
    deleteChoice(id, subject, code, start1, end1, start2, end2, start3, end3, period) {
      const module = {
        id: id,
        subject: subject,
        code: code,
        start1: start1,
        end1: end1,
        start2: start2,
        end2: end2,
        start3: start3,
        end3: end3,
        period: period
      };
      this.choices = this.choices.filter((choice) => choice.id !== id)
      this.modules = [...this.modules, module]
    },
    nextPeriodSemester() {
      let s = this.semester;
      if (s < 6) {
        if (this.p == 2) {
          this.semester++
          this.p = 4
        } else if (this.p == 5) {
          this.semester++
          this.p = 1
        } else {
          this.p++
        }
      } else {
        this.semester = 6
        if (this.p == 4) {
          this.p = 5

        } else {
          this.p = 5

        }
      }


    },
    previousPeriodSemester() {
      let s = this.semester;
      if (s > 1) {
        if (this.p == 4) {
          this.semester--
          this.p = 2
        } else if (this.p == 1) {
          this.semester--
          this.p = 5
        } else {
          this.p--
        }
      } else {
        this.semester = 1
        if (this.p == 2) {
          this.p = 1
        } else {
          this.p = 1
        }
      }
    },
  

      
    }
}
  
 


</script>
   // matchModules(id, subject, code, start1, end1, start2, end2, start3, end3, period) {
    //   if (subject == 'PRA') {
    //     this.modules = this.modules.filter(function (practical) {
    //       return practical.subject !== 'PRA'
    //     })
    //     this.modules = this.modules.filter(function (course) {
    //       const rc1 = moment.range(course.start1, course.end1)
    //       const rc2 = moment.range(course.start2, course.end2)
    //       const rp1 = moment.range(start1, end1)
    //       // console.log(start2!==null)
    //       if (start3 !== null) {
    //         const rp2 = moment.range(start2, end2);
    //         const rp3 = moment.range(start3, end3);
    //         console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //           || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))
    //           || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))
    //         return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //           || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))
    //           || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))
    //       }
    //       if ((start3 == null) && (start2 !== null)) {
    //         const rp2 = moment.range(start2, end2);
    //         // console.log((rc1.overlaps(rp1) || rc2.overlaps(rp1)))
    //         // console.log((rc1.overlaps(rp2) || rc2.overlaps(rp2)))
    //         console.log((!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //           || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))))

    //         return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //           || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)))
    //         // return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
    //         // || (rc1.overlaps(rp2) || rc2.overlaps(rp2)))
    //       }
    //       if (start2 == null) {
    //         // console.log(rp1)
    //         // console.log(rc2.overlaps(rp1))
    //         console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
    //         return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
    //       }
    //     })
    //   }
    //   else {
    //     this.modules = this.modules.filter(function (course) {
    //       const rc1 = moment.range(course.start1, course.end1)
    //       const rc2 = moment.range(course.start2, course.end2)
    //       const rp1 = moment.range(start1, end1);
    //       const rp2 = moment.range(start2, end2);
    //       return (!(rc1.overlaps(rp1) || rc1.overlaps(rp2)) || !(rc2.overlaps(rp1) || rc2.overlaps(rp2)))
    //     })
    //     this.modules = this.modules.filter(function (course) {
    //       const rc1 = moment.range(start1, end1)
    //       const rc2 = moment.range(start2, end2)
    //       const rp1 = moment.range(course.start1, course.end1)
    //       // console.log(start2!==null)
    //       if (course.start3 !== null) {
    //         const rp2 = moment.range(course.start2, course.end2);
    //         const rp3 = moment.range(course.start3, course.end3);
    //         console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //           || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))
    //           || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))
    //         return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //           || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))
    //           || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))
    //       }
    //       if ((course.start3 == null) && (course.start2 !== null)) {
    //         const rp2 = moment.range(course.start2, course.end2);
    //         // console.log((rc1.overlaps(rp1) || rc2.overlaps(rp1)))
    //         // console.log((rc1.overlaps(rp2) || rc2.overlaps(rp2)))
    //         console.log((!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //           || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))))

    //         return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //           || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)))
    //         // return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
    //         // || (rc1.overlaps(rp2) || rc2.overlaps(rp2)))
    //       }
    //       if (course.start2 == null) {
    //         // console.log(rp1)
    //         // console.log(rc2.overlaps(rp1))
    //         console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
    //         return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
    //       }
    //     })
    //   }
    //   console.log(id)
    //   this.addChoice(id, subject, code, period);
    // },