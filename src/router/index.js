import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE,
    routes: [
        {
            path:'/',
            name:'home',
            component:Home
        },
        {
            path:'/chat',
            name:'chat',
            component:()=>import('../components/community/chatSite')
        },
        {
            path:'/qna',
            name:'qna',
            component:()=>import('../components/community/QuestionBoard')
        }

    ]
})