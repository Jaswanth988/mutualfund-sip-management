"use client";

import InputField from "@/app/components/InputField";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import ProfileContext from "@/app/core/contexts/ProfileContext";
export default function LoginPage() {
    const router = useRouter();
    const { storeDetails } = useContext(ProfileContext);

    const [Id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/investor/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: Id,
                    pass: password,
                }),
            });

            const result = await response.json();

            storeDetails(Id, password);
             document.cookie=`token=${result.token}`
            router.push("/dashboard");
        } catch (error) {
            alert(error.message || "Login failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black-200">
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-80">
                <h1 className="text-2xl font-bold text-center">Login</h1>

                <InputField
                    placeholder="Id"
                    type="text"
                    inputValue={setId}
                />

                <InputField
                    placeholder="Password"
                    type="password"
                    inputValue={setPassword}
                />

                <button
                    onClick={handleLogin}
                    className="bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
                >
                    Login
                </button>

                <p>{Id}</p>
                <p>{password}</p>
            </div>
        </div>
    );
}