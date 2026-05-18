"use client";

import {
    useState
} from "react";

import {
    useRouter
} from "next/navigation";

import {
    useAuth
} from "@/app/context/authContext";

export default function LoginPage() {

    const router = useRouter();

    const { login } = useAuth();

    const [Id, setId] = useState("");

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {

        try {

            setLoading(true);

            setMessage("");

            /* VALIDATION */

            if(!Id || !password)
            {
                setMessage(
                    "Please enter all fields"
                );

                setLoading(false);

                return;
            }

            const response = await fetch(
                "http://localhost:4000/api/investor/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({
                        id: Id,
                        pass: password
                    })
                }
            );

            const result = await response.json();

            console.log(result);

           if(response.ok)
{
    login({
        token: result.token,
        investor_id: result.investor_id
    });

    setMessage("Login Success");

    router.replace("/dashboard");
}
            else
            {
                setMessage(
                    result.error
                );
            }

        }
        catch(error)
        {
            console.log(error);

            setMessage(
                "Server Error"
            );
        }
        finally
        {
            setLoading(false);
        }
    };

    return (

        <div className="flex justify-center items-center min-h-screen bg-[#F5F5F7]">

            <div className="flex flex-col gap-4 bg-white p-8 rounded-3xl shadow-lg w-96">

                <h1 className="text-3xl font-bold text-center text-[#6C2CF1]">
                    Investor Login
                </h1>

                {
                    message && (

                        <div className="bg-[#EEE8FF] text-[#6C2CF1] p-3 rounded-xl text-center">
                            {message}
                        </div>
                    )
                }

                <input
                    type="text"
                    placeholder="Investor ID"
                    value={Id}
                    onChange={(e)=>
                        setId(e.target.value)
                    }
                    className="border p-3 rounded-xl outline-none"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>
                        setPassword(e.target.value)
                    }
                    className="border p-3 rounded-xl outline-none"
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="bg-[#6C2CF1] text-white py-3 rounded-xl"
                >

                    {
                        loading
                        ? "Logging In..."
                        : "Login"
                    }

                </button>

            </div>

        </div>
    );
}