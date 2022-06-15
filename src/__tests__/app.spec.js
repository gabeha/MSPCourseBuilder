//import { mount } from '@vue/test-utils'
//import App from './../src/App.vue'


describe("MyFirstTest",()=> {

  test("is one", ()=>{
    expect(1).toBe(1);
  });
})


// describe('App', () => {
//     // Inspect the raw component options
//     test('has data', () => {
//       expect(typeof App.data).toBe('function')
//     })
//   })
    
// describe('Mounted App', () => {
//   const wrapper = mount(App);

//   test('does a wrapper exist', () => {
//     expect(wrapper.exists()).toBe(true)
//   })
// })

// import { mount } from '@vue/test-utils'
// import App from './../src/App.vue'

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
