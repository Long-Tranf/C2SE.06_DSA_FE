import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';

function App() {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    const isAuthenticated = !!localStorage.getItem('accessToken'); // Token trong localStorage (hoặc đổi sang state/context nếu cần)

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public routes */}
                    {publicRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        >
                            {route.children &&
                                route.children.map((child, idx) => (
                                    <Route
                                        key={idx}
                                        path={child.path}
                                        element={child.element}
                                    />
                                ))}
                        </Route>
                    ))}

                    {/* Private routes */}
                    {privateRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                isAuthenticated ? (
                                    route.element
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                    ))}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
