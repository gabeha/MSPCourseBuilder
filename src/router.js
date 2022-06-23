import { createRouter, createWebHistory } from 'vue-router'
import useAuthUser from './composables/UseAuthUser'
import LandingPage from './pages/LandingPage.vue'
import CourseWiki from './pages/CourseWiki.vue'
import CourseBuilder from './pages/CourseBuilder.vue'
import AboutPage from './pages/AboutPage.vue'



const routes = [
  {
        name: "home",
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
      path: "/email-confirmation",
      name: "EmailConfirmation",
      component: () => import("./pages/Emailconfirmation.vue")
    },
    {
      path: "/login",
      name: "Acc",
      component: () => import("./pages/Acc.vue")
    },
  {
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser()
      await logout()
      return { name: "home" }
    }
   },
    {
      path: "/dashboard",
      name: "Dashboard",
      meta: {
          requiresAuth: true
      },
      component: () => import("./pages/Dashboard.vue")
    },
    {
      path: "/forgotpassword",
      name: "ForgotPassword",
      component: () => import("./pages/ForgotPassword.vue")
    }
  ]
const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser();
  if (!isLoggedIn() && to.meta.requiresAuth && !Object.keys(to.query).includes("fromEmail")
  ) {
    return { path: "/login" };
  }
});

export default router;

