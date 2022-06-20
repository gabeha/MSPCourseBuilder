<template>
  <div>
    <Toggle @nextperiod="nextPeriodSemester" @lastperiod="previousPeriodSemester" :this_period="this_period" :semester="semester" />
    <Semester :modules='modules' :available="available" :semester="semester" :this_period="this_period" @makechoice="matchModules"  />
    <div class="p-t-8 px-8 mt-8">
   
    <div class= "w-1/4 right-0 top-9 px-5 fixed trunicate  text-center pt-8 rounded-t-3xl h-24 bg-gray-300">
        <h1 class="text-bold text-black text-3xl">TRACKER</h1>
    </div>        
 </div>
    <div class="w-1/4 fixed top-40 p-5 right-0 rounded-3xl h-5/6 bg-gray-200">
      <Reqs  :choices='choices' :mathreq="mathreq" :lasreq="lasreq" :advanced="advanced" :advancedp="advancedp" :intro="intro" :introp="introp" />
      <Choice :this_period="this_period" :semester="semester" :choices='choices' @deletechoice="deleteChoice"  />
    </div>
    </div>
</template>


<script>
import { supabase } from "./supabase.js"
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Semester from './components/Semester.vue';
import Toggle from './components/Toggle.vue'
import Choice from './components/Choice.vue'
import Reqs from './components/Reqs.vue'

const moment = extendMoment(Moment);
export default {
  name: 'App',
  components: {
    Semester,
    Toggle,
    Choice,
    Reqs
  },
  data() {
    return {
      modules: [],
      courses: [],
      practicals: [],
      choices: [],
      this_period: 4,
      semester: 2,
      mathreq: 0,
      lasreq: 0,
      advanced: 0,
      intro: 0,
      advancedp: 0,
      introp: 0,
      available: []
    }
  },

  mounted() {
    this.fetchAllModules();
  },

  methods: {
    async fetchAllCourses() {
      const response = await supabase
        .from('courses')
        .select()
      this.courses = response.data;
      // console.log(this.courses)
    },

    matchModules(id, subject, code, start1, end1, start2, end2, start3, end3, period, semester, thisperiod) {
      const p = this.this_period
      if (subject == 'PRA') {
        this.modules = this.modules.filter(function (practical) {
          return practical.subject !== 'PRA' || practical.period !== p
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
              || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)) || course.period !== p)
          }
          if ((start3 == null) && (start2 !== null)) {
            const rp2 = moment.range(start2, end2);
            // console.log((rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            // console.log((rc1.overlaps(rp2) || rc2.overlaps(rp2)))
            // console.log((!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
            //   || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))))

            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
              || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)) || course.period !== p)
            // return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            // || (rc1.overlaps(rp2) || rc2.overlaps(rp2)))
          }
          if (start2 == null) {
            // console.log(rp1)
            // console.log(rc2.overlaps(rp1))
            // console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))

            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) || course.period !== p)
          }
        })
      }
      else {
        this.modules = this.modules.filter(function (course) {
          const rc1 = moment.range(course.start1, course.end1)
          const rc2 = moment.range(course.start2, course.end2)
          const rp1 = moment.range(start1, end1);
          const rp2 = moment.range(start2, end2);
          return (!(rc1.overlaps(rp1) || rc1.overlaps(rp2)) || !(rc2.overlaps(rp1) || rc2.overlaps(rp2)) || course.period !== p)
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
              || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)) || course.period !== p)
          }
          if ((course.start3 == null) && (course.start2 !== null)) {
            const rp2 = moment.range(course.start2, course.end2);
            // console.log((rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            // console.log((rc1.overlaps(rp2) || rc2.overlaps(rp2)))
            // console.log((!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
            //   || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))))

            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
              || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)) || course.period !== p)
            // return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
            // || (rc1.overlaps(rp2) || rc2.overlaps(rp2)))
          }
          if (course.start2 == null) {
            // console.log(rp1)
            // console.log(rc2.overlaps(rp1))
            // console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) || course.period !== p)
          }
        })
      }
      this.addChoice(id, subject, code, start1, end1, start2, end2, start3, end3, period, semester, thisperiod)

    },
   
    addChoice(id, subject, code, start1, end1, start2, end2, start3, end3, period, semester, thisperiod) {
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
        period: period,
        semester: semester,
        selectionperiod: thisperiod
      };
      this.choices = [...this.choices, choice]
      if (subject == 'PRA'){
              if (code > 3000) {
                this.advancedp++
              } else if (code < 2000 ) {
                this.introp++
              } else {
                this.advancedp = this.advancedp
                this.introp = this.introp
              }
      }
      else if (subject == 'ÍNT') {
        if (code == 3001) {
          this.lasreq++
          this.advanced++
        } else if (code == 2007) {
          this.lasreq++
        } else {
          if (code > 3000) {
            this.advanced++
          } else if (code < 2000) {
            this.intro++
          } else {
            this.advanced = this.advanced
            this.intro = this.intro
          }
        }
      } else if (subject == 'HUM') {
        this.lasreq++
      } else if (subject == 'MAT') {
        this.mathreq++ 
            if (code == '3001') {
          this.lasreq++
          this.advanced++
        } else if (code == '2007') {
          this.lasreq++
        } else {
          if (code > 3000) {
            this.advanced++
          } else if (code < 2000) {
            this.intro++
          } else {
            this.advanced = this.advanced
            this.intro = this.intro
          }
        }
      } else {
        this.mathreq = this.mathreq
        this.lasreq = this.lasreq
        if (code == '3001') {
          this.lasreq++
          this.advanced++
        } else if (code == '2007') {
          this.lasreq++
        } else {
          if (code > 3000) {
            this.advanced++
          } else if (code < 2000) {
            this.intro++
          } else {
            this.advanced = this.advanced
            this.intro = this.intro
          }
        }
      }
    },

    // function ava(subject, start1, end1, start2, end2, start3, end3, period)

   
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
      this.available = response.data;
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
      }
      );

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

      if (subject == 'MAT') {
        this.mathreq--
      } else if ((subject == 'HUM') || (subject == 'ÍNT' && (code == 3001 || code == 2007))) {
        this.lasreq--
      } else {
        this.mathreq = this.mathreq
        this.lasreq = this.lasreq
      }
    if (subject == 'PRA'){
      if (code > 3000) {
        this.advancedp--
      } else if (code < 2000 ) {
        this.introp--
      } else {
        this.advancedp = this.advancedp
        this.introp = this.introp
      }
    } else {
      if (code > 3000) {
        this.advanced--
      } else if (code < 2000 ) {
        this.intro--
      } else {
        this.advanced = this.advanced
        this.intro = this.intro
      }
    }
    },
    nextPeriodSemester() {
      let s = this.semester;
      if (s < 6) {
        if (this.this_period == 2) {
          this.semester++
          this.this_period = 4
        } else if (this.this_period == 5) {
          this.semester++
          this.this_period = 1
        } else {
          this.this_period++
        }
      } else {
        this.semester = 6
        if (this.this_period == 4) {
          this.this_period = 5

        } else {
          this.this_period = 5

        }
      }
    },
    previousPeriodSemester() {
      let s = this.semester;
      if (s > 2) {
        if (this.this_period == 4) {
          this.semester--
          this.this_period = 2
        } else if (this.this_period == 1) {
          this.semester--
          this.this_period = 5
        } else {
          this.this_period--
        }
      } else {
        this.semester = 2
        if (this.this_period == 5) {
          this.this_period = 4
        } else {
          this.this_period = 4
        }
      }
    },

  }
    }  
 


</script>
  