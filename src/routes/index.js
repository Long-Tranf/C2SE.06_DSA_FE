//Pages
import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';
import Search from '~/pages/Search/Search';

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
        path: '/search',
        component: Search,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
