import Home from '../pages/Home'
import Login from '../pages/Login'
import { Children } from 'react'
// import CheckLogin from '../pages/checkLogin'

const routes = [
    {
        path: "/",
        component: Home,
        exact: true,
        public: false
    },
    {
        path: "/auth",
        component: Login,
        exact: true,
        public: true,
    },
]



export default routes