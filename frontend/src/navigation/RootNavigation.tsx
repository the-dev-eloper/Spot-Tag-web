import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Authenticated } from './Authenticated';
import { UnAuthenticated } from './UnAuthenticated';

export const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: () => { },
    onLogout: () => { },
});

export const RootNavigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isAuthenticated,
                onLogin: () => {
                    if (!isAuthenticated) {
                        setIsAuthenticated(true);
                    }
                },
                onLogout: () => {
                    if (isAuthenticated) {
                        setIsAuthenticated(false);
                    }
                },
            }}
        >
            <Router>
                {isAuthenticated ? <Authenticated /> : <UnAuthenticated />}
            </Router>
        </AuthContext.Provider>
    );
}
