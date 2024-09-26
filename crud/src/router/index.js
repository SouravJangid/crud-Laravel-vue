import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentsView from '../views/Students/View.vue'
import studentsCreate from '../views/Students/Create.vue'
import studentEdit from '../views/Students/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/students',
      name:'students',
      component: StudentsView
    },
    {
      path:'/students/create',
      name:'studentsCreate',
      component: studentsCreate
    },
    {
      path:'/students/:id/edit',
      name:'studentEdit',
      component: studentEdit
    }
  ]
})

export default router
