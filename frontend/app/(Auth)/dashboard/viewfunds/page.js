"use client";

import { useEffect, useState }
from "react";

export default function ViewFundsPage() {

    const [funds, setFunds] =
    useState([]);

    const [loading, setLoading] =
    useState(true);

    useEffect(() => {

        fetchFunds();

    }, []);

    const fetchFunds =
    async () => {

        try {

            /* INVESTOR ID */

            const investorId =
            "INV101";

            /* GET HOLDINGS */

            const response =
            await fetch(
`http://localhost:4000/api/investor/holdings/${investorId}`
            );

            const data =
            await response.json();

            console.log(data);

            setFunds(data);

            setLoading(false);

        }
        catch(error)
        {
            console.log(error);

            setLoading(false);
        }
    };

    if(loading)
    {
        return (
            <div className="p-8 text-xl">
                Loading Funds...
            </div>
        );
    }

    return (

        <div className="p-8 bg-[#F5F5F7] min-h-screen">

            {/* HEADER */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-[#6C2CF1]">
                    My Invested Funds
                </h1>

                <p className="text-gray-500 mt-2">
                    View all your invested mutual funds
                </p>

            </div>

            {/* SUMMARY */}

            <div className="grid grid-cols-3 gap-6 mb-10">

                <div className="bg-white p-6 rounded-2xl shadow-sm">

                    <h2 className="text-gray-500">
                        Total Funds
                    </h2>

                    <p className="text-3xl font-bold mt-2">
                        {funds.length}
                    </p>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">

                    <h2 className="text-gray-500">
                        Total Investment Value
                    </h2>

                    <p className="text-3xl font-bold mt-2 text-green-600">

                        ₹ {
                            funds.reduce(
                                (acc, item) =>

                                acc +
                                Number(
                                    item.current_value
                                ),
                                0
                            ).toFixed(2)
                        }

                    </p>

                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">

                    <h2 className="text-gray-500">
                        Total Units
                    </h2>

                    <p className="text-3xl font-bold mt-2">

                        {
                            funds.reduce(
                                (acc, item) =>

                                acc +
                                Number(
                                    item.total_units
                                ),
                                0
                            ).toFixed(2)
                        }

                    </p>

                </div>

            </div>

            {/* FUND CARDS */}

            <div className="grid grid-cols-3 gap-6">

                {
                    funds.map((fund) => (

                        <div
                            key={fund.holding_id}
                            className="bg-white p-8 rounded-3xl shadow-sm border"
                        >

                            <h2 className="text-2xl font-bold text-gray-800">
                                {fund.fund_name}
                            </h2>

                            <div className="mt-6 space-y-3">

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Holding ID
                                    </span>

                                    <span className="font-semibold">
                                        {fund.holding_id}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Total Units
                                    </span>

                                    <span className="font-semibold">

                                        {
                                            Number(
                                                fund.total_units
                                            ).toFixed(2)
                                        }

                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        NAV
                                    </span>

                                    <span className="font-semibold">
                                        ₹ {fund.latest_nav}
                                    </span>

                                </div>

                                <div className="flex justify-between">

                                    <span className="text-gray-500">
                                        Current Value
                                    </span>

                                    <span className="font-bold text-green-600">

                                        ₹ {
                                            Number(
                                                fund.current_value
                                            ).toFixed(2)
                                        }

                                    </span>

                                </div>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}