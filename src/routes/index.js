//Pages
import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';
import Signup from '~/pages/Signup/Signup';
import Search from '~/pages/Search/Search';
import Profile from '~/pages/Profile/Profile';
import CategoryDetail from '~/pages/CategoryDetail/CategoryDetail';
import LoginAdmin from '~/pages/Admin/Login/LoginAdmin';
import AdminDashboard from '~/pages/Admin/Dashboard/AdminDashboard';

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
        path: '/categorydetail',
        component: CategoryDetail,
    },
    {
        path: '/loginadmin',
        component: LoginAdmin,
    },
    {
        path: '/dashboardadmin',
        component: AdminDashboard,
    },
    {
        path: '/dashboardadmin/user',
        component: AdminDashboard,
    },
    {
        path: '/dashboardadmin/post',
        component: AdminDashboard,
    },
];

const privateRoutes = [
    {
        path: '/profile',
        component: Profile,
    },
];

export { publicRoutes, privateRoutes };
