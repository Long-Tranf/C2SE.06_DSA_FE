//Pages
import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';
import Signup from '~/pages/Signup/Signup';
import Search from '~/pages/Search/Search';
import Profile from '~/pages/Profile/Profile';
import CategoryDetail from '~/pages/CategoryDetail/CategoryDetail';

//Public routes
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/signup',
        component: Signup,
    },
    {
        path: '/search',
        component: Search,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/categorydetail',
        component: CategoryDetail,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
