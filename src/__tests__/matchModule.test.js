//import { isArray } from "@vue/shared";
import { supabase } from '@supabase/supabase-js';
const smth = require('@vue/shared');
//const smth2 = require("./supabase.js")

describe("MyFirstTest",()=> {

    test("is one", ()=>{
      expect(1).toBe(1);
    });

    // test("extracts modules", ()=>
    // {
    //     modules = fetchAllModules()
    //     expect(modules.isArray).toBe(isArray)
    // })
  })

  
// describe("CorrectCourseSelection", () => {

// // test case 1:
// // check the correctness of the output if the first course is seleceted
// test('prints out the correct list of courses after first selection', ()=>{
//     //module = getModuleFromDatabase("BIO2003")
//     // create an object that stores the module list 
//     expectedOutput = 'hi'
//     recievedOutput= 'hi'
//     // same as assertEquals
//     expect(recievedOutput).toBe(expectedOutput)
// });
// })


function matchModules(selectedModule) {


    // ----- Scenario 1: Practical was selected, show all courses available for selection

    if (selectedModule.subject == 'PRA') {

      // Step 1: remove all other practicals from availability list
      this.modules = this.modules.filter(function(practical) {
       return practical.subject !== 'PRA'
      })

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
        return (!(rangeCourseDay1.overlaps(rangePracticalDay1) || rangeCourseDay1.overlaps(rangePracticalDay2)) || !(rangeCourseDay2.overlaps(rangePracticalDay1) || rangeCourseDay2.overlaps(rangePracticalDay2)))
      })

      // show all available practicals
      this.modules = this.modules.filter(practicalInTheTable => this.filterOutPractical(selectedModule, practicalInTheTable))
    }
    this.addChoice(selectedModule.id, selectedModule.subject, selectedModule.code);
    this.testListOfAvailableModules = this.modules;
    console.log(this.testListOfAvailableModules)
    
  }

  function fetchAllModules() {
    const response = supabase
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
    return this.modules
  }

  function addChoice(id, subject, code) {
    const choice = {
      id: id,
      subject: subject,
      code: code
    };
    this.choices = [...this.choices, choice]
  }