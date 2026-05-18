"use client";

import { useState } from "react";

export default function AddSipPage() {

    const [formData, setFormData] = useState({
        sip_id: "",
        portfolio_id: "",
        fund_id: "",
        sip_amount: "",
        frequency: "",
        start_date: "",
        status: "ACTIVE"
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:4000/api/sip/addsip",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            console.log(data);

            if(response.ok)
            {
                alert("SIP Added Successfully");
            }
            else
            {
                alert(data.error);
            }

        }
        catch(error)
        {
            console.log(error);

            alert("Server Error");
        }
    };

    return (

        <div className="p-8">

            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl">

                <h1 className="text-3xl font-bold mb-8 text-[#6C2CF1]">
                    Add SIP
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-5"
                >

                    <input
                        type="number"
                        name="sip_id"
                        placeholder="SIP ID"
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        name="portfolio_id"
                        placeholder="Portfolio ID"
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        name="fund_id"
                        placeholder="Fund ID"
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <input
                        type="number"
                        name="sip_amount"
                        placeholder="SIP Amount"
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <select
                        name="frequency"
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    >
                        <option value="">
                            Select Frequency
                        </option>

                        <option value="MONTHLY">
                            MONTHLY
                        </option>

                        <option value="WEEKLY">
                            WEEKLY
                        </option>

                        <option value="YEARLY">
                            YEARLY
                        </option>
                    </select>

                    <input
                        type="date"
                        name="start_date"
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    />

                    <select
                        name="status"
                        onChange={handleChange}
                        className="border p-3 rounded-lg"
                    >
                        <option value="ACTIVE">
                            ACTIVE
                        </option>

                        <option value="PAUSED">
                            PAUSED
                        </option>
                    </select>

                    <button
                        type="submit"
                        className="col-span-2 bg-[#6C2CF1] text-white py-3 rounded-xl font-semibold hover:bg-[#5820d6]"
                    >
                        Create SIP
                    </button>

                </form>

            </div>
        </div>
    );
}