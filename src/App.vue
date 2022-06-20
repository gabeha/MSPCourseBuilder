<template>
  <div>
    <!-- Header that displays the semester nr, and buttons to change periods -->
    <Toggle @nextperiod="nextPeriodSemester" @lastperiod="previousPeriodSemester" :this_semester="this_semester" />
    <Semester :modules='modules' :this_semester="this_semester" :this_period="this_period" @makechoice="matchModules"  />
    <div class="p-t-8 px-8 mt-8">
   
    <div class= "w-1/4 right-0 top-9 px-5 fixed trunicate  text-center pt-8 rounded-t-3xl h-24 bg-gray-300">
        <h1 class="text-bold text-black text-3xl">TRACKER</h1>
    </div>        
 </div>
 <!-- Displays the progress on the student meeting their graduation requirements -->
    <div class="w-1/4 fixed  top-40 p-5 right-0 rounded-3xl h-full mb-12 bg-gray-200">
      <div class="bg-white relative rounded-2xl h-10 w-full text-xl px-5 mx-auto ">
          <!-- <progress value=30 max="180" class="absolute overflow-hidden w-full right-0  h-full"  > -->
          <h1 class="mx-auto absolute inline-block text-black mb-7">CREDITS: </h1>
          <h1 class="mx-auto absolute right-5  text-black inline-block pr-3  mb-7"> {{ this.credits }} / 180 total </h1>
      <!-- </progress> -->
      </div>
   <Reqs :choices='choices' :mathreq="this.mathreq" :lasreq="this.lasreq" :advanced="this.advanced" :advancedp="advancedp" :intro="intro" :introp="introp" />
      <Choice :this_period="this_period" :this_semester="this_semester" :choices='choices' @deletechoice="deleteChoice"  />
    </div>
  </div>
    <!-- <div class="grid gap-4 grid-cols-3 grid-flow-row-dense md:gridcols-2 w-3/4 bg-white rounded-3xl truncate  p-8" >
        <div class="relative block h-14 rounded-3xl w-full bg-gray-100 py-2 col-span-3  row-span-1">
                <h2 class="text-black rounded-t-xl text-2xl text-center tracking-widest" >PERIOD  {{ this_period }} </h2>
        </div>  
            <div :class="(subject == 'PRA') ? 'col-span-3' : 'col-span-1'" class="bg-gray-100 m-3  rounded-3xl" v-for= "(subject, index) in sub" :key="index" >
                <button v-for="(subject, index) in sub" :key="index"  class="h-12 m-3 rounded-full text-xl relative-top-4 w-full text-center bg-gray-200 mx-auto">
                    {{ subject  }} 
                </button> 
                <div class="grid grid-cols-4">
                <Button v-show="module.subject in sub&& module.period == this_period" @select="matchModules" :module="module"  />
            </div>
            </div> 
      </div> -->
</template>


<script>
import { supabase } from "./supabase.js";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Semester from './components/Semester.vue';
import Toggle from './components/Toggle.vue'
import Choice from './components/Choice.vue'
import Reqs from './components/Reqs.vue'
import Button from './components/Button.vue'

const moment = extendMoment(Moment);
export default {
  name: 'App',
  components: {
    Semester,
    Toggle,
    Choice,
    Button,
    Reqs
  },
  data() {
    return {
      modules: [],
      courses: [],
      practicals: [],
      choices: [],
      this_period: 4,
      this_semester: 2,
      sub: ['BIO', 'CHE', 'PHY', 'INT', 'NEU', 'MAT', 'PRA'],
       // returned from nextPeriodSemester and previousPeriodSemester
      // counts the number of fullfilled reqs ++ when addChoice -- when deleteChoice
      mathreq: 0,
      lasreq: 0,
      advanced: 0,
      intro: 0,
      advancedp: 0,
      introp: 0,
      credits: 30
    }
  },

  mounted() {
    this.fetchAllModules();
  },

  methods: {
    // Fetching everything ----------------------------------------------------------------------------------
    async fetchAllCourses() {
      const response = await supabase
        .from('courses')
        .select()
      this.courses = response.data;
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
        // .eq('period', 4)
      this.modules = response.data;
      console.log(this.modules)
      this.modules.forEach(element => {
        if (element.start1 != null) {
          element.start1 = new Date(element.start1);
          element.end1 = new Date(element.end1);
        }
        // element.start1 = new Date(element.start1);
        // element.end1 = new Date(element.end1);
        if (element.start2 != null) {
          element.start2 = new Date(element.start2);
          element.end2 = new Date(element.end2);
        }
        if (element.start3 != null) {
          element.start3 = new Date(element.start3);
          element.end3 = new Date(element.end3);
        }
      });
     return this.modules
    },
    // --------------------------------------------------------------------------------------------------------
    // matchModules(selectedModule) {

    //   // console.log(selectedModule.code)

    //   // ----- Scenario 1: Practical was selected, show all courses available for selection

    //   if (selectedModule.subject == 'PRA') {
        
    //     // We dont want to remove them now APPARENTELY
    //     // // Step 1: remove all other practicals from availability list
    //     // this.modules = this.modules.filter(function(practical) {
    //     //  return practical.subject !== 'PRA'
    //     // })

    //     // Step 2: compare timeslot for each course in the availability list and remove overlapping ones
    //     this.modules = this.modules.filter(courseInTheTable => this.filterOutPractical(courseInTheTable, selectedModule))
    //   }

    //   // ----- Scenario 2: Course was selected, show all practicals and courses available for selection
    //   else {

    //     // show all available courses
    //     this.modules = this.modules.filter(function(course) {

    //     // get timeslots for the course from the list of available courses
    //       const rangeCourseDay1 = moment.range(course.start1, course.end1)
    //       const rangeCourseDay2 = moment.range(course.start2, course.end2)

    //     // get timeslots of the course that was selected (input course)
    //       const rangePracticalDay1 = moment.range(selectedModule.start1, selectedModule.end1);
    //       const rangePracticalDay2 = moment.range(selectedModule.start2, selectedModule.end2);

    //       // if at least one timeslot overlaps -> remove course
    //       return (!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay1.overlaps(rangePracticalDay2)) || !(rangeCourseDay2.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay2)))
    //     })

    //     // show all available practicals
    //     this.modules = this.modules.filter(practicalInTheTable => this.filterOutPractical(selectedModule, practicalInTheTable))
    //   }
    //   this.addChoice(selectedModule.id, selectedModule.subject, selectedModule.code);
    //   return this.modules
    // },
//--------------------------------------------------------------------------------------------

    
    // matchModules(id, subject, code, start1, end1, start2, end2, start3, end3, period,  coreq, prereq) {
    // const p = this.this_period
    //   if (subject == 'PRA') {
    //     this.modules = this.modules.filter(function (practical) {
    //       return practical.subject !== 'PRA' || practical.period !== p
    //     })
    //     this.modules = this.modules.filter(function (course) {
    //       const rc1 = moment.range(course.start1, course.end1)
    //       const rc2 = moment.range(course.start2, course.end2)
    //       const rp1 = moment.range(start1, end1)
    //       // console.log(start2!==null)
    //       if (start3 !== null) {
    //         const rp2 = moment.range(start2, end2);
    //         const rp3 = moment.range(start3, end3)
    //         // console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //         //   || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))
    //         //   || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))
    //         return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //           || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))
    //           || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)) || course.period !== p)
    //       }
    //       if ((start3 == null) && (start2 !== null)) {
    //         const rp2 = moment.range(start2, end2);
    //         // console.log((rc1.overlaps(rp1) || rc2.overlaps(rp1)))
    //         // console.log((rc1.overlaps(rp2) || rc2.overlaps(rp2)))
    //         // console.log((!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //         //   || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))))

    //         return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //           || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)) || course.period !== p)
    //         // return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
    //         // || (rc1.overlaps(rp2) || rc2.overlaps(rp2)))
    //       }
    //       if (start2 == null) {
    //         // console.log(rp1)
    //         // console.log(rc2.overlaps(rp1))
    //         // console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))

    //         return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) || course.period !== p)
    //       }
    //     })
    //   }
    //   else {
    //     this.modules = this.modules.filter(function (course) {
    //       const rc1 = moment.range(course.start1, course.end1)
    //       const rc2 = moment.range(course.start2, course.end2)
    //       const rp1 = moment.range(start1, end1);
    //       const rp2 = moment.range(start2, end2);
    //       return (!(rc1.overlaps(rp1) || rc1.overlaps(rp2)) || !(rc2.overlaps(rp1) || rc2.overlaps(rp2)) || course.period !== p)
    //     })
    //     this.modules = this.modules.filter(function (course) {
    //       const rc1 = moment.range(start1, end1)
    //       const rc2 = moment.range(start2, end2)
    //       const rp1 = moment.range(course.start1, course.end1)
    //       // console.log(start2!==null)
    //       if (course.start3 !== null) {
    //         const rp2 = moment.range(course.start2, course.end2);
    //         const rp3 = moment.range(course.start3, course.end3);
    //         // console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //         //   || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))
    //         //   || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)))
    //         return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //           || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))
    //           || !(rc1.overlaps(rp3) || rc2.overlaps(rp3)) || course.period !== p)
    //       }
    //       if ((course.start3 == null) && (course.start2 !== null)) {
    //         const rp2 = moment.range(course.start2, course.end2);
    //         // console.log((rc1.overlaps(rp1) || rc2.overlaps(rp1)))
    //         // console.log((rc1.overlaps(rp2) || rc2.overlaps(rp2)))
    //         // console.log((!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //         //   || !(rc1.overlaps(rp2) || rc2.overlaps(rp2))))

    //         return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1))
    //           || !(rc1.overlaps(rp2) || rc2.overlaps(rp2)) || course.period !== p)
    //         // return(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) 
    //         // || (rc1.overlaps(rp2) || rc2.overlaps(rp2)))
    //       }
    //       if (course.start2 == null) {
    //         // console.log(rp1)
    //         // console.log(rc2.overlaps(rp1))
    //         // console.log(!(rc1.overlaps(rp1) || rc2.overlaps(rp1)))
    //         return (!(rc1.overlaps(rp1) || rc2.overlaps(rp1)) || course.period !== p)
    //       }
    //     })
    //   }
    //   this.addChoice(id, subject, code, start1, end1, start2, end2, start3, end3, period,  coreq, prereq)

    // },
    
    // 
    matchModules(selectedModule) {
      const thisperiod = this.this_period
          
      // console.log(selectedModule.code)

      // ----- Scenario 1: Practical was selected, show all courses available for selection

      if (selectedModule.subject == 'PRA') {
        
        // We dont want to remove them now APPARENTELY
        // // Step 1: remove all other practicals from availability list
        // this.modules = this.modules.filter(function(practical) {
        //  return practical.subject !== 'PRA'
        // })

        // Step 2: compare timeslot for each course in the availability list and remove overlapping ones
        this.modules = this.modules.filter(courseInTheTable => this.filterOutPractical(courseInTheTable, selectedModule))
      }

      // ----- Scenario 2: Course was selected, show all practicals and courses available for selection
      else {

        // show all available courses
        this.modules = this.modules.filter(function(course) {

        // get timeslots for the course from the list of available courses
          const rangeCourseDay1 = moment.range(course.start1, course.end1)
          const rangeCourseDay2 = moment.range(course.start2, course.end2)

        // get timeslots of the course that was selected (input course)
          const rangePracticalDay1 = moment.range(selectedModule.start1, selectedModule.end1);
          const rangePracticalDay2 = moment.range(selectedModule.start2, selectedModule.end2);

          // if at least one timeslot overlaps -> remove course
          return (!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay1.overlaps(rangePracticalDay2)) || !(rangeCourseDay2.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay2)) || course.period !== thisperiod)
        })

        // show all available practicals
        this.modules = this.modules.filter(practicalInTheTable => this.filterOutPractical(selectedModule, practicalInTheTable))
      }
      this.addChoice(selectedModule.id, selectedModule.subject, selectedModule.code, selectedModule.start1, selectedModule.end1, selectedModule.start2, selectedModule.end2, selectedModule.start3, selectedModule.end3, selectedModule.period, selectedModule.hascoreq, selectedModule.hasprereq);

      return this.modules
    },
    filterOutPractical(course, practical){
      const thisperiod = this.this_period
      {   
      // get timeslots of the course 
      const rangeCourseDay1 = moment.range(course.start1, course.end1)
      const rangeCourseDay2 = moment.range(course.start2, course.end2)
        // get the timeslot for the first day when the practical is offered
      const rangePracticalDay1 = moment.range(practical.start1, practical.end1)
      // if the practical is only offered on one day
        if (practical.start2 == null) 
        {
        return (!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)) || course.period!==thisperiod || practical.period!==thisperiod)
      }

      // if the practical is offered on two different days
      if ((practical.start3 == null) && (practical.start2 !== null)) {
        const rangePracticalDay2 = moment.range(practical.start2, practical.end2);

        return(!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)) 
        || !(rangeCourseDay1.overlaps(rangePracticalDay2) || rangeCourseDay2.overlaps(rangePracticalDay2))|| course.period!==thisperiod || practical.period!==thisperiod)

      }

      // if the practical is offered on three different days
      if (practical.start3 !== null) {
        const rangePracticalDay2 = moment.range(practical.start2, practical.end2);
        const rangePracticalDay3 = moment.range(practical.start3, practical.end3);

        return (!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay1)) 
        || !(rangeCourseDay1.overlaps(rangePracticalDay2) || rangeCourseDay2.overlaps(rangePracticalDay2)) 
        || !(rangeCourseDay1.overlaps(rangePracticalDay3) || rangeCourseDay2.overlaps(rangePracticalDay3))|| course.period!==thisperiod || practical.period!==thisperiod)
      }}},
    addChoice(id, subject, code, start1, end1, start2, end2, start3, end3, period, coreq, prereq) {
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
        coreq: coreq,
        prereq: prereq,
        thissemester: this.this_semester,
        selectionperiod: this.this_period
    };
      // const choice = {

      this.choices = [...this.choices, choice]

      console.log(this.choices)
      if (choice.subject == 'PRA') {
        this.credits += 5 / 2
        if (choice.code > 3000) {
          this.advancedp++
        } else if (choice.code < 2000) {
          this.introp++
        } else {
          this.advancedp = this.advancedp
          this.introp = this.introp
        }
      }
      else {
        this.credits += 5
        if (choice.subject == 'ÍNT') {
          if (cchoice.ode == 3001) {
            this.lasreq++
            this.advanced++
          } else if (choice.code == 2007) {
            this.lasreq++
          } else {
            if (choice.code > 3000) {
              this.advanced++
            } else if (choice.code < 2000) {
              this.intro++
            } else {
              this.advanced = this.advanced
              this.intro = this.intro
            }
          }
        } else if (choice.subject == 'HUM') {
          this.lasreq++
        } else if (choice.subject == 'MAT') {
          this.mathreq++
          if (choice.code == '3001') {
            this.lasreq++
            this.advanced++
          } else if (choice.code == '2007') {
            this.lasreq++
          } else {
            if (choice.code > 3000) {
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
      }
    },


    async deleteChoice(id, subject, code, start1, end1, start2, end2, start3, end3, period, semester, thisperiod) {
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
        period: period,
        semester: semester,
        selectionperiod: thisperiod
      };
    
      this.choices = this.choices.filter((choice) => choice.id !== id) // removes choice from choices array
      this.modules = [...this.modules, module]

      const renew = await supabase
            .from('modules')
            .select()
            // .eq('period', 4)
          this.modules = renew.data;
          this.modules.filter(module => (module in this.choices))
          this.modules.forEach(element => {
            if (element.start1 != null) {
              element.start1 = new Date(element.start1);
              element.end1 = new Date(element.end1);
            }
            // element.start1 = new Date(element.start1);
            // element.end1 = new Date(element.end1);
            if (element.start2 != null) {
              element.start2 = new Date(element.start2);
              element.end2 = new Date(element.end2);
            }
            if (element.start3 != null) {
              element.start3 = new Date(element.start3);
              element.end3 = new Date(element.end3);
            }
          })

      if (subject == 'PRA') {
        this.credits -= 5 / 2
        if (code > 3000) {
          this.advancedp--
        } else if (code < 2000) {
          this.introp--
        } else {
          this.advancedp = this.advancedp
          this.introp = this.introp
        }
      } else {
        this.credits -= 5
        if (subject == 'ÍNT') {
          if (choice.code == 3001) {
            this.lasreq--
            this.advanced--
          } else if (choice.code == 2007) {
            this.lasreq--
          } else {
            if (choice.code > 3000) {
              this.advanced--
            } else if (choice.code < 2000) {
              this.intro--
            } else {
              this.advanced = this.advanced
              this.intro = this.intro
            }
          }
        } else if (subject == 'HUM') {
          this.lasreq--
        } else if (subject == 'MAT') {
          this.mathreq--
          if (code == '3001') {
            this.lasreq--
            this.advanced--
          } else if (code == '2007') {
            this.lasreq--
          } else {
            if (code > 3000) {
              this.advanced--
            } else if (code < 2000) {
              this.intro--
            } else {
              this.advanced = this.advanced
              this.intro = this.intro
            }
          }
        } else {
          this.mathreq = this.mathreq
          this.lasreq = this.lasreq
          if (code == '3001') {
            this.lasreq--
            this.advanced--
          } else if (code == '2007') {
            this.lasreq--
          } else {
            if (code > 3000) {
              this.advanced--
            } else if (code < 2000) {
              this.intro--
            } else {
              this.advanced = this.advanced
              this.intro = this.intro
            }
          }
        }
      }
    },
   async nextPeriodSemester() {
      if (this.this_semester < 6) {
        if (this.this_period == 2) {// period 2 is the last period of every uneven semester 
          this.this_semester++
          this.this_period = 4
          this.credits+=1
        } else if (this.this_period == 5) { // period 5 is the last period of every even semester 
          this.this_semester++
          this.this_period = 1
          this.credits+=1
          const renew = await supabase
            .from('modules')
            .select()
            // .eq('period', 4)
          this.modules = renew.data;
          this.modules.filter(module => (module in this.choices))
          this.modules.forEach(element => {
            if (element.start1 != null) {
              element.start1 = new Date(element.start1);
              element.end1 = new Date(element.end1);
            }
            // element.start1 = new Date(element.start1);
            // element.end1 = new Date(element.end1);
            if (element.start2 != null) {
              element.start2 = new Date(element.start2);
              element.end2 = new Date(element.end2);
            }
            if (element.start3 != null) {
              element.start3 = new Date(element.start3);
              element.end3 = new Date(element.end3);
            }
          }
          )
        } else {
          this.this_period++
        }
      } else {
        this.this_semester = 6 // assume semester 6 is last semester, this is how we prevent further semesters
        if (this.this_period == 4) {
          this.this_period = 5
        } else {
          this.this_period = 5

        }
      }
    },
    previousPeriodSemester() {
      if (this.this_semester > 2) {
        if (this.this_period == 4) {
          this.this_semester--
          this.this_period = 2
        } else if (this.this_period == 1) {
          this.this_semester--
          this.this_period = 5
        } else {
          this.this_period--
        }
      } else {
        this.this_semester = 2
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
  