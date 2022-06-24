<template>
  <!-- Nav bar (anton's)-->
    <nav class="relative container mx-auto p-2">
            <div class="flex items-center justify-between font-semibold">
               <!--logo-->
               <div class="pt-2">
                <img src="#" alt="" class=""/>
               </div>
               <!--Menu items-->
                <div class="hidden lg:flex lg:space-x-10 xl:space-x-20 ">
                    <a href="#" class="hover:text-blue-300 text-sm ">Home</a>
                    <a href="builder.html" class="hover:text-blue-300 text-sm ">Curriculum Planner</a> 
                    <a href="#" class="hover:text-blue-300 text-sm ">Course Wiki</a>
                    <a href="#" class="hover:text-blue-300 text-sm ">About Us</a>
                    <a href="#" class="hover:text-blue-300 text-sm ">Log in</a>  
                </div>
                <!--Button--> 
                <a href="#"
             class="flex md:block p-3 px-6 pt-2 text-white bg-blue-900 rounded-full baseline hover:bg-blue-300 d"
             >Get started</a
             >
                <!--Hamburger Icon-->
                <button id="menu-btn" class="block hamburger lg:hidden focus:outline-none">
                    <span class="hamburger-top"></span>
                    <span class="hamburger-middle"></span>
                    <span class="hamburger-bottom"></span>
                </button>
            </div>
                
                <div class="lg:hidden">
                    <div id="menu" class="absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md">
                        <a href="#" >Home</a>
                        <a href="#" >Curriculum Planner</a> 
                        <a href="#" >Course Wiki</a>
                        <a href="#" >About Us</a>
                        <a href="#" >Log in</a> 
                     </div>
                 </div>
    </nav>

<!-- box -->

<!-- top course bar and button -->
<div class="flex container justify-center items-center my-4 mx-auto">
  
  <!-- course bar -->
  <select @click = "selectorUsed" v-model="id" v-if="modules !== null" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-4 mx-auto h-12 baseline" required>
    <option disabled value=""> PLease select a course</option>
     <!-- Course Code, Period offered, Title -->
    <option v-for="m in modules" :key="m.id" :value="m.id">{{m.subject}}{{m.code}}, {{m.period}}, {{m.description.title}} </option>
  </select>

  <!-- Add course button -->
  <div class="flex-col">
    <button type="button" @click="popupadd=!popupadd" class="p-3 mx-4 mx-auto text-white bg-blue-900 rounded-md h-12 w-12 text-center  hover:bg-blue-300"> + </button>
  </div>
</div>

<!-- <div class="flex container "> -->
<div class="container grid grid-cols-3 gap-5">
<!-- column 1 -->
  <div class="flex flex-col w-full space-y-3">

    <!-- title box -->
    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 mx-12"> Course Title </label>
    <input v-model="title" placeholder="Course Title"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-12" required>
    
  
  <div class="grid grid-cols-3 gap-10">
    <div class="space-x-6">
      <!-- subject -->
      <div class="flex container flex-col">
        <label for="subjects" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Subject</label>
        <select v-model="subject"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-28 p-2.5 mx-12 h-10" required>
          <option value="BIO">BIO</option>
          <option value="CHE">CHE</option>
          <option value="PHY">PHY</option>
          <option value="MAT">MAT</option>
          <option value="INT">INT</option>
          <option value="NEU">NEU</option>
          <option value="PRA">PRA</option>
          <option value="HUM">HUM</option>
          <option value="KEN">KEN</option>
          <option value="SCI">SCI</option>
          <option value="EXT">Others</option>
        </select> 
      </div>
    </div>
    <div class="space-x-6">
      <!-- code -->
      <div class="flex container flex-col">
        <label for="code" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Code</label>
        <input v-model="code" placeholder="Code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-28 p-2.5 mx-12 h-10" required>
      </div> 
    </div>
   <div class="space-x-6">
      <!-- Periods -->
      <div>
        <label for="period" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Period</label>
        <select v-model="period" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-28 p-2.5 mx-12 h-10" required>
          <option value="1">P1</option>
          <option value="2">P2</option>
          <option value="4">P4</option>
          <option value="5">P5</option>
        </select>
      </div>
    </div>
  </div>

    <!-- course coordinator -->
    <label for="course_coordinator" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Course Coordinator</label>
    <input  placeholder="Course coordinator 1, Course coordinator 2, ..." v-model="course_coordinator" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-12" required>

    <!-- contact -->
    <label for="fcontact" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Contact</label>
    <input placeholder="Email 1, Email 2, ..." v-model="contact" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-12" required>

    <!-- pre-requisites -->
    <label for="pre_requisites" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Pre-requisites</label>
    <input placeholder="Pre-requisite 1, Pre-requisite 2, Pre-requisite 3, ..." v-model="pre_requisites" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-12" required>

    <!-- co-requisites -->
    <label for="co_requisites" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Co-requisites</label>
    <input placeholder="Co-requisite 1, Co-requisite 2, Co-requisite 3, ..." v-model="co_requisites" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-12" required>

    <!-- recommended -->
    <label for="recommended" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Recommended</label>
    <input  placeholder="Recommended 1, Recommended 2, ..." v-model="recommended" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-12" required>
  </div>
   
<!-- column 2 -->
  <div class="flex flex-col w-full space-y-3">

    <!-- objectives -->
    <label for="objectives" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Objectives</label>
    <textarea placeholder="Objectives" v-model="objectives" rows="12" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-12" required> </textarea>

    <!-- course description -->
    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Course Description</label>
    <textarea placeholder="Description" v-model="description" rows="12" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-12" required> </textarea>
  </div>

<!-- column 3 -->
  <div class="flex flex-col w-full space-y-3">

    <!-- literature -->
    <label for="literature" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Literature</label>
    <input placeholder="Literature 1, Literature 2, ..." v-model="literature" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-12" required>

    <!-- Format -->
    <label for="format" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Format</label>
    <input placeholder="Lectures, Tutorials, ..."  v-model="format" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-12" required>

    <!-- Assessment -->
    <label for="assessment" class="block mb-2 text-sm font-medium text-gray-900 mx-12">Assessment</label>
    <input  placeholder="Midterm, Final, ..." v-model="assessment" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-12" required>

    <!-- grid days etc -->
    <div class="grid grid-cols-3 grid-rows-1 gap-4 ">
        <!-- col 1 -->
        <div>  
          <div class="mb-2">
            <label for="day1" class="block mb-2 text-sm font-medium text-gray-900 mx-12 w-48">Day 1</label>
            <select v-model="day1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-12 h-12 w-32" required>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
            </select>
          </div>
          <div class="mb-2">
            <label for="day2" class="block mb-2 text-sm font-medium text-gray-900 mx-12 w-48">Day 2</label>
            <select v-model="day2" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-12 h-12 w-32" required>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="None">None</option>
            </select>                
          </div>
          <div class="mb-2">
            <label for="day3" class="block mb-2 text-sm font-medium text-gray-900 mx-12 w-48">Day 3</label>
            <select v-model="day3" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-12 h-12 w-32" required>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="None">None</option>
            </select>                
          </div>
        </div>
        <!-- col2 2 -->
        <div>
          <div class="mb-2">
            <!-- start time d1 -->
            <label for="start_time_d1" class="block mb-2 text-sm font-medium text-gray-900 mx-12 w-48"> Start Day 1</label>
            <input v-model="start_time_d1" type="time" min="08:00" max="20:00" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-12 h-12 w-32" required>
          </div>
          <div class="mb-2">
            <!-- start time d2 -->
            <label for="start_time_d2" class="block mb-2 text-sm font-medium text-gray-900 mx-12 w-48"> Start Day 2</label>
            <input v-model="start_time_d2" type="time" min="08:00" max="20:00" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-12 h-12 w-32">
          </div>
          <div class="mb-2">
            <!-- start time d3 -->
            <label for="start_time_d3" class="block mb-2 text-sm font-medium text-gray-900 mx-12 w-48"> Start Day 3</label>
            <input v-model="start_time_d3" type="time" min="08:00" max="20:00" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-12 h-12 w-32">
          </div>
        </div>
        <!-- col 3 -->
        <div>
          <div class="mb-2">
            <!-- end time d1 -->
            <label for="end_time_d1" class="block mb-2 text-sm font-medium text-gray-900 mx-12 w-48"> End Day 1</label>
            <input v-model="end_time_d1" type="time" min="08:00" max="20:00" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-12 h-12 w-32" required>
          </div>
          <div class="mb-2">
            <!-- end time d2 -->
            <label for="end_time_d2" class="block mb-2 text-sm font-medium text-gray-900 mx-12 w-48"> End Day 2</label>
            <input v-model="end_time_d2" type="time" min="08:00" max="20:00" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-12 h-12 w-32">
          </div>
          <div class="mb-2">
            <!-- end time d2 -->
            <label for="end_time_d3" class="block mb-2 text-sm font-medium text-gray-900 mx-12 w-48"> End Day 3</label>
            <input v-model="end_time_d3" type="time" min="08:00" max="20:00" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-12 h-12 w-32">
          </div>
        </div>
    </div>
  </div>
</div>

<!-- BUTTONS -->
<div class="grid grid-cols-3 gap-5 place-items-center">
  <div class="flex-col">
    <button type="button" @click="popupcancel=!popupcancel" class="mt-12 p-3 mx-4 mx-auto text-white bg-blue-900 rounded-md baseline hover:bg-blue-300">CANCEL</button>
  </div>
  <div class="flex-col">
    <button type="button" @click="popupdelete=!popupdelete"  class="mt-12 p-3 mx-4 mx-auto text-white bg-blue-900 rounded-md baseline hover:bg-blue-300">DELETE COURSE</button>
  </div>
  <div class="flex-col ">
    <input type="submit" value="SAVE" @click="popupsave=!popupsave"  class="mt-12 p-3 mx-4 mx-auto text-white bg-blue-900 rounded-md baseline hover:bg-blue-300">
  </div>
</div>


<!-- cancel button -->
<div v-if="popupcancel" class="mx-auto p-5 border w-1/2 h-1/2 shadow-lg rounded-md bg-white fixed mx-auto top-1/4 left-1/4 flex items-center justify-center z-10">
	<div class="mt-3 text-center">
		<h3 class="text-5xl font-medium text-gray-900">A new course will be created</h3>
		<div class="my-6 px-7 py-3">
			<p class="text-md text-gray-500">
				Do you want to continue? All edits will be lost 
			</p>
		</div>
		<div class="items-center px-4 py-3 space-x-6 my-6">
			<button
				id="cancel-btn"  @click="popupcancel=!popupcancel"
				class="px-4 py-2 text-white bg-red-500 rounded-md baseline hover:bg-red-300">
				Keep Changes
			</button>
      <button
				id="save-btn" @click="cancelButton"
				class="px-4 py-2 text-white bg-blue-900 rounded-md baseline hover:bg-blue-300">
				Cancel
			</button>
		</div>
	</div>
</div>
<div  v-else ></div>
<!-- new course -->

<div v-if="popupadd" class="mx-auto p-5 border w-1/2 h-1/2 shadow-lg rounded-md bg-white fixed mx-auto top-1/4 left-1/4 flex items-center justify-center z-10">
	<div class="mt-3 text-center">
		<h3 class="text-5xl font-medium text-gray-900">A new course will be created</h3>
		<div class="my-6 px-7 py-3">
			<p class="text-md text-gray-500">
				Do you want to continue? All edits will be lost 
			</p>
		</div>
		<div class="items-center px-4 py-3 space-x-6 my-6">
			<button
				id="cancel-btn"  @click="popupadd=!popupadd"
				class="px-4 py-2 text-white bg-red-500 rounded-md baseline hover:bg-red-300">
				Cancel
			</button>
      <button
				id="save-btn" @click="activateCreateMode"
				class="px-4 py-2 text-white bg-blue-900 rounded-md baseline hover:bg-blue-300">
				Add course
			</button>
		</div>
	</div>
</div>
<div  v-else ></div>


<!-- delete -->

<div v-if="popupdelete" class="mx-auto p-5 border w-1/2 h-1/2 shadow-lg rounded-md bg-white fixed mx-auto top-1/4 left-1/4 flex items-center justify-center z-10">
	<div class="mt-3 text-center">
		<h3 class="text-5xl font-medium text-gray-900">This course is going to be deleted</h3>
		<div class="my-6 px-7 py-3">
			<p class="text-md text-gray-500">
				Are you sure you want ot delete this course?
			</p>
		</div>
		<div class="items-center px-4 py-3 space-x-6 my-6">
			<button
				id="cancel-btn" @click="popupdelete=!popupdelete"
				class="px-4 py-2 text-white bg-red-500 rounded-md baseline hover:bg-red-300">
				Cancel
			</button>
      <button
				id="save-btn" @click="deleteModule"
				class="px-4 py-2 text-white bg-blue-900 rounded-md baseline hover:bg-blue-300">
				Delete course
			</button>
		</div>
	</div>
</div>
<div  v-else ></div>

<!-- save button -->
<div v-if="popupsave" class="mx-auto p-5 border w-1/2 h-1/2 shadow-lg rounded-md bg-white fixed mx-auto top-1/4 left-1/4 flex items-center justify-center z-10">
	<div class="mt-3 text-center">
		<h3 class="text-5xl font-medium text-gray-900">Changes were made</h3>
		<div class="my-6 px-7 py-3">
			<p class="text-md text-gray-500">
				All changes cannot be undone, confirm your changes?
			</p>
		</div>
		<div class="items-center px-4 py-3 space-x-6 my-6">
			<button
				id="cancel-btn" @click = "popupsave=!popupsave"
				class="px-4 py-2 text-white bg-red-500 rounded-md baseline hover:bg-red-300">
				Cancel
			</button>
      <button
				id="save-btn" @click="commitButton"
				class="px-4 py-2 text-white bg-blue-900 rounded-md baseline hover:bg-blue-300">
				Save
			</button>
		</div>
	</div>
</div>
<div  v-else ></div>



 <!-- Footer -->

 <footer id="footer" class="bg-gray-200 mt-6">
  <div class="container flex flex-col px-6 py-0 mx-auto space-y-12 md:py-12 md:flex-row md:spacey.0 items-center justify-center">
    <div class="text-black font-bold text-lg items-center justify-center flex">
      <div class="hidden md:flex lg:space-x-10 xl:space-x-20 ">
        <a href="#" class="hover:text-blue-300">Home</a>
        <a href="#" class="hover:text-blue-300">Curriculum Planner</a> 
        <a href="#" class="hover:text-blue-300">Course Wiki</a>
        <a href="#" class="hover:text-blue-300">About Us</a>
        <a href="#" class="hover:text-blue-300">Log in</a>  
      </div>
    </div>
  </div>
</footer>

</template>

<script>
import {supabase} from "./supabase.js"

export default {
  name: 'App',
  
  data() {
    return {
      popupcancel: false,
      popupsave: false,
      popupdelete: false,
      popupadd: false,

      modules: [],

      id: null,
      title: '',
      subject: '',
      code: '',
      course_coordinator: '',
      contact: '',
      pre_requisites: '',
      co_requisites: '',
      recommended: '',
      objectives: '',
      description: '',
      literature: '',
      format: '',
      assessment: '',
      period: null,
      day1: '',
      start_time_d1: null,
      end_time_d1: null,
      day2: '',
      start_time_d2: null,
      end_time_d2: null,
      day3: '',
      start_time_d3: null,
      end_time_d3: null,

      createMode: false
    }
  },
  mounted() {
    this.retrieveData()
  },
  methods: {
    commitButton() {
            this.popupsave=!this.popupsave
            // Selecting the input element and get its value 
            if (this.inputChecker()){
              this.createOrUpdate()
            }
            else{
              alert('Invalid input')
              console.log("Invalid Input")
            }
            // this.inititalizeData()
            // console.log(this.id)
            // console.log(this.title)
            // console.log(this.subject)
            // console.log(this.code)
            // console.log(this.course_coordinator)
            // console.log(this.contact)
            // console.log(this.pre_requisites)
            // console.log(this.co_requisites)
            // console.log(this.recommended)
            // console.log(this.objectives)
            // console.log(this.description)
            // console.log(this.literature)
            // console.log(this.format)
            // console.log(this.assessment)
            // console.log(this.period)
            // console.log(this.day1)
            // console.log(this.start_time_d1)
            // console.log(this.end_time_d1)
            // console.log(this.day2)
            // console.log(this.start_time_d2)
            // console.log(this.end_time_d2)
            // console.log(this.day3)
            // console.log(this.start_time_d3)
            // console.log(this.end_time_d3)
      },
    // accesses database and stores all the modules from the table in the modules array
    async retrieveData() {
      const response = await supabase
        .from('testjens')
        .select()
        this.modules = response.data
        //console.log(this.modules)
    },
    // accesses database and deletes the module from the table with the current this.id
    async deleteModule(id){  
      this.popupdelete=!this.popupdelete
      const { data, error } = await supabase
      .from('testjens')
      .delete()
      .eq('id', this.id)

      // resets info on site to be up to date and clears all inputs
      this.id = null
      this.inititalizeData()
      await this.retrieveData()

    },
    //accesses database and creates a new entry in the modules table containing all entered values
    async createModule(){
      const { data, error } = await supabase
      .from('testjens')
      .insert([{ 'period': this.period, 'code': this.code, 'subject': this.subject, 'hasprerec': this.noneChecker(this.pre_requisites), 'hascorec': this.noneChecker(this.co_requisites)
              , 'description': this.createJSON()
              , 'start1': this.createDate(this.day1,this.start_time_d1), 'end1': this.createDate(this.day1,this.end_time_d1)
              , 'start2': this.createDate(this.day2,this.start_time_d2), 'end2': this.createDate(this.day2,this.end_time_d2)
              , 'start3': this.createDate(this.day3,this.start_time_d3), 'end3': this.createDate(this.day3,this.end_time_d3)
              }])
      
      // resets info on site to be up to date and clears all inputs
      this.id = null
      this.inititalizeData()
      await this.retrieveData()
    },
    //accesses database and edits a module with the current this.id with the entered values
    async updateModule(){ 
      console.log("HI") 
      const { data, error } = await supabase
      .from('testjens')
      .update({ 'hasprerec': this.noneChecker(this.pre_requisites), 'hascorec': this.noneChecker(this.co_requisites)
              , 'description': this.createJSON(),'period': this.period
              , 'start1': this.createDate(this.day1,this.start_time_d1), 'end1': this.createDate(this.day1,this.end_time_d1)
              , 'start2': this.createDate(this.day2,this.start_time_d2), 'end2': this.createDate(this.day2,this.end_time_d2)
              , 'start3': this.createDate(this.day3,this.start_time_d3), 'end3': this.createDate(this.day3,this.end_time_d3)
              })
      .eq('id', this.id)

      // resets info on site to be up to date and clears all inputs
      this.id = null
      this.inititalizeData()
      await this.retrieveData()
    },
    // checks if the input is '', used for hasprerec and hascorec above
    noneChecker(input){
      return(input != '')
    },
    // creates a JSON to store all the information that is in the description colum of the database
    createJSON() {
      const module_description = {
        title: this.title,
        course_coordinator: [(this.course_coordinator)],
        contact: [(this.contact)],
        pre_requisites: [(this.pre_requisites)],
        co_requisites: [(this.co_requisites)],
        recommended: [(this.recommended)],
        objectives: [(this.objectives)],
        description: this.description,
        literature: [(this.literature)],
        format: this.format,
        assessment: [(this.assessment)]

      }
      return((module_description))
    },
    // takes the entered day and time to be formated in the way required for the database
    createDate(day,time){
        switch(day){
          case 'Monday':
            return ('2022-06-06 '+time[0] +time[1] +':'+time[3] +time[4] +':00.00')
          case 'Tuesday':
            return ('2022-06-07 '+time[0]+time[1]+':'+time[3]+time[4]+':00.00')
          case 'Wednesday':
            return ('2022-06-08 '+time[0]+time[1]+':'+time[3]+time[4]+':00.00')
          case 'Thursday':
            return ('2022-06-09 '+time[0]+time[1]+':'+time[3]+time[4]+':00.00')
          case 'Friday':
            return ('2022-06-10 '+time[0]+time[1]+':'+time[3]+time[4]+':00.00')

        }
    },
    // returns true or false if all inputs are within the allowed ranges and values
    inputChecker(){
      return (this.code != '' && this.subject != '' && this.title != '' 
      && this.course_coordinator != '' && this.period != '' && this.day1 != '' 
      && this.start_time_d1 != '' && this.end_time_d1 != '' && this.code < 4000 
      && this.code>1000 && this.period < 6 && this.period > 0 && this.subject.length < 4)
    },
  //desides whether to call the create or update method depending on the value of createMode (default false) then sets it back to default
  createOrUpdate(){
    console.log("HI") 
    console.log(this.createMode)

    if (this.createMode){
      this.createModule()
      this.createMode = false
    }
    else{
      this.updateModule()
    }    
  },
  // activated on button bress to initiate create mode, maybe it should check first if entries have been saved to not accedentaly delete previous progress
  activateCreateMode(){
    this.popupadd=!this.popupadd
    if (!this.createMode)
      this.createMode = true
      this.id = null
      this.inititalizeData()
  },
  // initializes data, if and id is selected sets values to the ids values, else sets everything to default values
  inititalizeData(){
    if (this.id != null){
      for (let i = 0; i<this.modules.length; i++){
        if (this.modules[i].id == this.id){
          this.title= this.modules[i].description.title
          this.subject= this.modules[i].subject
          this.code= this.modules[i].code
          this.course_coordinator= this.modules[i].description.course_coordinator
          this.contact= this.modules[i].description.contact
          this.pre_requisites= this.modules[i].description.pre_requisites
          this.co_requisites= this.modules[i].description.co_requisites
          this.recommended= this.modules[i].description.recommended
          this.objectives= this.modules[i].description.objectives
          this.description= this.modules[i].description.description
          this.literature= this.modules[i].description.literature
          this.format= this.modules[i].description.format
          this.assessment= this.modules[i].description.assessment
          this.period= this.modules[i].period
          this.day1= this.dayFinder(this.modules[i].start1)
          this.start_time_d1= this.timeFinder(this.modules[i].start1)
          this.end_time_d1=  this.timeFinder(this.modules[i].end1)
          this.day2= this.dayFinder(this.modules[i].start2)
          this.start_time_d2= this.timeFinder(this.modules[i].start2)
          this.end_time_d2= this.timeFinder(this.modules[i].end2)
          this.day3= this.dayFinder(this.modules[i].start3)
          this.start_time_d3= this.timeFinder(this.modules[i].start3)
          this.end_time_d3= this.timeFinder(this.modules[i].end3)

          return;
        }
      }
      console.log("ID not found")
    }
    else{
      this.title= ''
      this.subject= ''
      this.code= ''
      this.course_coordinator= ''
      this.contact= ''
      this.pre_requisites= ''
      this.co_requisites= ''
      this.recommended= ''
      this.objectives= ''
      this.description= ''
      this.literature= ''
      this.format= ''
      this.assessment= ''
      this.period= null
      this.day1= '',
      this.start_time_d1= null
      this.end_time_d1= null
      this.day2= '',
      this.start_time_d2= null
      this.end_time_d2= null
      this.day3= '',
      this.start_time_d3= null
      this.end_time_d3= null
    }
  
  },
  //uses the timestamp to find the day the course is offered
  dayFinder(timestamp){
    if (timestamp == null)
      return null
    switch (timestamp[9]){
      case '6':
        return 'Monday'
      case '7':
        return 'Tuesday'
      case '8':
        return 'Wednesday'
      case '9':
        return 'Thursday'
      case '0':
        return 'Friday'
    }
  },
  //uses the timestamp to find the time the course is offered
  timeFinder(timestamp){
    if (timestamp == null)
      return null
    return (''+timestamp[11]+timestamp[12]+timestamp[13]+timestamp[14]+timestamp[15])
  },
  // splits the inputed data into an array using the ;; as the delimitator
  arrayMaker(str){
    return (str.split(';;'))
  },
  //Activated on cancel button
  cancelButton(){
    this.popupcancel=!this.popupcancel
    this.id = null
    this.inititalizeData()
  },
  //changes create mode to false when the selector is used
  selectorUsed(){
    this.createMode= false
    this.inititalizeData()
  }
  // checkvalue(val)
  //   {
  //     if(val==="others")
  //       document.getElementById('subjecto').style.display='block';
  //     else
  //       document.getElementById('subjecto').style.display='none'; 
  //         },
}
}
</script>
