import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';

function App() {
    const isAdmin = () => {
        // Kiểm tra quyền (ví dụ: role lưu trong localStorage)
        return localStorage.getItem('userRole') === 'admin';
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Page />}
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    isAdmin() ? <Page /> : <Navigate to="/" />
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
