"use client";
import { useState } from "react";
import ProfileContext from "../contexts/ProfileContext";

export default function ProfileProvider({ children }) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    function storeDetails(id, password) {
        setId(id);
        setPassword(password);
    }

    return (
        <ProfileContext.Provider value={{ storeDetails, id, password }}>
            {children}
        </ProfileContext.Provider>
    );
}