"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token =
        Cookies.get("token");

        const investorId =
        Cookies.get("investor_id");

        if(token && investorId)
        {
            setUser({
                token,
                investor_id: investorId
            });
        }

        setLoading(false);

    }, []);

    const login = (data) => {

        Cookies.set(
            "token",
            data.token,
            {
                expires: 7,
                path: "/"
            }
        );

        Cookies.set(
            "investor_id",
            data.investor_id,
            {
                expires: 7,
                path: "/"
            }
        );

        setUser({
            token: data.token,
            investor_id: data.investor_id
        });
    };

    const logout = () => {

        Cookies.remove("token");

        Cookies.remove("investor_id");

        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};