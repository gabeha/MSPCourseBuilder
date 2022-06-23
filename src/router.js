import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './pages/LandingPage.vue'
import CourseWiki from './pages/CourseWiki.vue'
import CourseBuilder from './pages/CourseBuilder.vue'
import AboutPage from './pages/AboutPage.vue'
import LoginPage from './pages/LoginPage.vue'
import SignIn from './components/SignIn.vue'
import SignUp from './components/SignUp.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: '/',
        component: LandingPage,
    },
    {
        path: '/builder',
        component: CourseBuilder 
    },
    {
        path: '/wiki',
        name: 'CourseWiki',
        component: CourseWiki 
    },
    {
        path: '/about',
        component: AboutPage 
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/signin',
      component: SignIn
    },
    {
      path: '/signup',
      component: SignUp
    },
  ]
})