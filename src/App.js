import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { publicRoutes, privateRoutes, privateRoutesAdmin } from '~/routes';
import ScrollToTopButton from './components/Layout/components/ScrollToTopButton/ScrollToTopButton';

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

    useEffect(() => {
        const updateVisitCount = async () => {
            try {
                const response = await fetch(
                    'http://127.0.0.1:8000/api/tracking',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                );
                const data = await response.json();
                console.log('Total visit count updated:', data.visit_count);
            } catch (error) {
                console.error('Error updating visit count:', error);
            }
        };

        updateVisitCount();
    }, []);

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
                <ScrollToTopButton />
            </div>
        </Router>
    );
}

export default App;
