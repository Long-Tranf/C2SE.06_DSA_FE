import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';
import Signup from '~/pages/Signup/Signup';
import Search from '~/pages/Search/Search';
import Profile from '~/pages/Profile/Profile';
import CategoryDetail from '~/pages/CategoryDetail/CategoryDetail';
import Post from '~/pages/Post/Post';
import Library from '~/pages/LibraryPage/Library';
import GroupProfile from '~/pages/GroupProfile/GroupProfile';
import LoginAdmin from '~/pages/Admin/Login/LoginAdmin';
import AdminDashboard from '~/pages/Admin/Dashboard/AdminDashboard';
import UserManagement from '~/pages/Admin/UserManagement/UserManagement';
import PostManagement from '~/pages/Admin/PostManagement/PostManagement';
import AddPost from '~/pages/Admin/AddPost/AddPost';
import CategoryManagement from '~/pages/Admin/CategoryManagement/CategoryManagement';
import AssociationManagement from '~/pages/Admin/AssociationManagement/AssociationManagement';
import ContantManagement from '~/pages/Admin/ContantManagement/ContantManagement';
import LibraryManagement from '~/pages/Admin/LibraryManagement/LibraryManagement';
import EventManagement from '~/pages/Admin/EventManagament/EventManagement';
import BannerManagement from '~/pages/Admin/BannerManagement/BannerManagement';

// Public routes
const publicRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/search',
        element: <Search />,
    },
    {
        path: '/category/:categoryId',
        element: <CategoryDetail />,
    },
    {
        path: '/post',
        element: <Post />,
    },
    {
        path: '/loginadmin',
        element: <LoginAdmin />,
    },
    {
        path: '/dashboardadmin',
        element: <AdminDashboard />,
        children: [
            { path: 'user', element: <UserManagement /> },
            { path: 'association', element: <AssociationManagement /> },
            { path: 'post', element: <PostManagement /> },
            { path: 'post/add', element: <AddPost /> },
            {
                path: '/dashboardadmin/post/edit/:postId',
                element: <AddPost />,
            },
            { path: 'category', element: <CategoryManagement /> },
            { path: 'library', element: <LibraryManagement /> },
            { path: 'contact', element: <ContantManagement /> },
            { path: 'banner', element: <BannerManagement /> },
            { path: 'event', element: <EventManagement /> },
        ],
    },
    {
        path: '/association',
        element: <GroupProfile />,
    },
    {
        path: '/library',
        element: <Library />,
    },
];

// Private routes
const privateRoutes = [
    {
        path: '/profile',
        element: <Profile />,
    },
];

export { publicRoutes, privateRoutes };
