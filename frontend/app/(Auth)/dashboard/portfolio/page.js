"use client";

import {
    useEffect,
    useState
} from "react";

import {
    useAuth
} from "@/app/context/authContext";

export default function PortfolioPage() {

    const { user } =
    useAuth();

    const [holdings, setHoldings] =
    useState([]);

    const [loading, setLoading] =
    useState(true);

    useEffect(() => {

        if(user?.investor_id)
        {
            fetchHoldings();
        }

    }, [user]);

    const fetchHoldings =
    async () => {

        try {

            /* GET USER ID */

            const investorId =
            user.investor_id;

            console.log(
                "Investor ID:",
                investorId
            );

            /* GET HOLDINGS */

            const response =
            await fetch(
`http://localhost:4000/api/investor/holdings/${investorId}`
            );

            const data =
            await response.json();

            console.log(data);

            setHoldings(data);

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
                Loading...
            </div>
        );
    }

    return (

<div className="p-8">

{/* HEADER */}

<div className="mb-8">

<h1 className="text-4xl font-bold text-[#6C2CF1]">
My Portfolio
</h1>

<p className="text-gray-500 mt-2">
Investor ID:
{" "}
<span className="font-semibold">
{user?.investor_id}
</span>
</p>

</div>

{/* CARDS */}

<div className="grid grid-cols-3 gap-6 mb-10">

<div className="bg-white p-6 rounded-2xl shadow-sm">

<h2 className="text-gray-500">
Total Holdings
</h2>

<p className="text-3xl font-bold mt-2">
{holdings.length}
</p>

</div>

<div className="bg-white p-6 rounded-2xl shadow-sm">

<h2 className="text-gray-500">
Total Value
</h2>

<p className="text-3xl font-bold mt-2">

₹ {
holdings.reduce(
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
Active Funds
</h2>

<p className="text-3xl font-bold mt-2">
{holdings.length}
</p>

</div>

</div>

{/* TABLE */}

<div className="bg-white rounded-2xl shadow-sm overflow-hidden">

<table className="w-full">

<thead className="bg-[#EEE8FF]">

<tr>

<th className="text-left p-5">
Holding ID
</th>

<th className="text-left p-5">
Fund Name
</th>

<th className="text-left p-5">
Units
</th>

<th className="text-left p-5">
NAV
</th>

<th className="text-left p-5">
Current Value
</th>

</tr>

</thead>

<tbody>

{
holdings.map(
(holding) => (

<tr
key={holding.holding_id}
className="border-b hover:bg-gray-50"
>

<td className="p-5">
{holding.holding_id}
</td>

<td className="p-5 font-medium">
{holding.fund_name}
</td>

<td className="p-5">

{
Number(
holding.total_units
).toFixed(2)
}

</td>

<td className="p-5">
₹ {holding.latest_nav}
</td>

<td className="p-5 font-semibold text-green-600">

₹ {
Number(
holding.current_value
).toFixed(2)
}

</td>

</tr>
)
)
}

</tbody>

</table>

</div>

</div>
    );
}