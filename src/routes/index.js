import Home from '~/pages/Home/Home';
import Login from '~/pages/Login/Login';
import Signup from '~/pages/Signup/Signup';
import Search from '~/pages/Search/Search';
import Profile from '~/pages/Profile/Profile';
import CategoryDetail from '~/pages/CategoryDetail/CategoryDetail';
import Post from '~/pages/Post/Post';
import LoginAdmin from '~/pages/Admin/Login/LoginAdmin';
import AdminDashboard from '~/pages/Admin/Dashboard/AdminDashboard';
import UserManagement from '~/pages/Admin/UserManagement/UserManagement';
import PostManagement from '~/pages/Admin/PostManagement/PostManagement';
import AddPost from '~/pages/Admin/AddPost/AddPost';
import CategoryManagement from '~/pages/Admin/CategoryManagement/CategoryManagement';
import AssociationManagement from '~/pages/Admin/AssociationManagement/AssociationManagement';
import ContantManagement from '~/pages/Admin/ContantManagement/ContantManagement';
import LibraryManagement from '~/pages/Admin/LibraryManagement/LibraryManagement';

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
        path: '/categorydetail',
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
        ],
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
