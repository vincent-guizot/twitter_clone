import Home from '../pages/Home'
import Login from '../pages/Login'
// import CheckLogin from '../pages/checkLogin'

const routes = [
    {
        path: "/home",
        component: Home,
        exact : true,
        public : false
    },
    {
        path: "/login",
        component: Login,
        exact : true,
        public : true
    },
]

export default routes