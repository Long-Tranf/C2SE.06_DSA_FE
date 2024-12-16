import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { publicRoutes, privateRoutes, privateRoutesAdmin } from '~/routes';

function App() {
    var isAuthenticatedMember = false;
    var isAuthenticatedAdmin = false;

    const accessToken = localStorage.getItem('accessToken');
    const token = localStorage.getItem('token');

    if (accessToken) {
        isAuthenticatedMember = true;
    }
    if (token) {
        isAuthenticatedAdmin = true;
    }
    console.log(isAuthenticatedAdmin);

    return (
        <Router>
            <div className="App">
                <Routes>
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

                    {privateRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                isAuthenticatedMember ? (
                                    route.element
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                    ))}

                    {privateRoutesAdmin.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                isAuthenticatedAdmin ? (
                                    route.element
                                ) : (
                                    <Navigate to="/loginadmin" replace />
                                )
                            }
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
