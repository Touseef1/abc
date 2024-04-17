import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Mainpage from '../views/Mainpage.vue'
import UpdateProduct from '../views/UpdateProduct.vue'
import Detail from '../views/Detail.vue'
import category from '../views/category.vue'
import categiryproduct from '../views/categiryproduct.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Product',
      name: 'Mainpage',
      component:Mainpage
    },
    {
      path: '/Add/:id?',
      name: 'UpdateProduct',
      component: UpdateProduct,
    },
    {
      path: '/category/product/:path?',
      name: 'categiryproduct',
      component:categiryproduct,
    },
    {
      path: '/Detail/:id?',
      name: 'Detail',
      component: Detail,
    },
    {
      path: '/category',
      name: 'category',
      component:category,
    },
  ]
})

export default router
