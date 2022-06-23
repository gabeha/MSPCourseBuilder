<template>
<div class="flex min-h-wiki container mx-auto">
    <SideBar
    @course-clicked="assignCourse"
    :modules="modules" 
    :physics="physics" 
    :maths="maths" 
    :biology="biology"
    :neuroscience="neuroscience"
    :chemistry="chemistry"
    :interdisciplinary="interdisciplinary"
    :practicals="practicals"></SideBar>
    <CourseDisplay 
    :modules="modules" 
    :highlightedModule="highlightedModule"></CourseDisplay>
</div>
</template>

<script>
import router from '../router.js'
import useSupabase from "../composables/UseSupabase";
const { supabase } = useSupabase()

export default {
    name: 'CourseWiki',
    components: {

    },
    data() {
      return {
        modules: [],
        physics: [],
        maths: [],
        biology: [],
        neuroscience: [],
        chemistry: [],
        interdisciplinary: [],
        practicals: [],
        highlightedModule: null
      }
    },
    created() {
      this.fetchAllModules()
    },
    methods: {
      async fetchAllModules() {
        let { data: modules, error } = await supabase
          .from('modules')
          .select()
          // .eq('period', '4')
        this.modules = modules
        // console.log(this.modules)
        // console.log(uniq)
        this.sortCourses()
      },
      sortCourses() {
            this.physics = this.modules.filter(module => module.subject == 'PHY')
            this.maths = this.modules.filter(module => module.subject == 'MAT')
            this.biology = this.modules.filter(module => module.subject == 'BIO')
            this.neuroscience = this.modules.filter(module => module.subject == 'NEU')
            this.chemistry = this.modules.filter(module => module.subject == 'CHE')
            this.interdisciplinary = this.modules.filter(module => module.subject == 'INT')
            this.practicals = this.modules.filter(module => module.subject == 'PRA')
        },
      assignCourse(id) {
        // console.log(id)
        this.highlightedModule = id
      }
    }
}
</script>