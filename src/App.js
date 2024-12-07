import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public routes */}
                    {publicRoutes.map((route, index) => {
                        return (
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
                        );
                    })}

                    {/* Private routes */}
                    {privateRoutes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element} // Hiển thị trực tiếp
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
