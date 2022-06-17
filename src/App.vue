<template>
  <div>
      <Toggle @nextperiod="nextPeriodSemester" @lastperiod="previousPeriodSemester" :period="p" :semester="semester" />
      <Semester :modules='modules' :p="p" @makechoice="matchModules"  />
      <Choice :p="p" :choices='choices' @deletechoice="deleteChoice"  />
      
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
      p: 1,
      semester: 1,
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
    },
    matchModules(id, subject, code, start1, end1, start2, end2, start3, end3, period) {
      if (subject == 'PRA') {
        this.modules = this.modules.filter(function (practical) {
          return practical.subject !== 'PRA'
        })
        this.modules = this.modules.filter(function (course) {
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

            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
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
        this.modules = this.modules.filter(function (course) {
          const rc1 = moment.range(course.start1, course.end1)
          const rc2 = moment.range(course.start2, course.end2)
          const rp1 = moment.range(start1, end1);
          const rp2 = moment.range(start2, end2);
          return (!(rc1.overlaps(rp1) || rc1.overlaps(rp2)) || !(rc2.overlaps(rp1) || rc2.overlaps(rp2)))
        })
        this.modules = this.modules.filter(function (course) {
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

            return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
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
      console.log(id)
      this.addChoice(id, subject, code, period);
    },
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
      console.log(this.modules)
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
    addChoice(id, subject, code, period , start1, end1, start2, end2, start3, end3) {
      const choice = {
        id: id,
        subject: subject,
        code: code,
        period: period,
        start1: start1,
        end1: end1,
        start2: start2,
        end2: end2,
        start3: start3,
        end3: end3
      };
      this.choices = [...this.choices, choice]
      // console.log(this.choices);
    },
    deleteChoice(id) {
       this.choices = this.choices.filter((choice) => choice.id !== id);
      
      
      
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