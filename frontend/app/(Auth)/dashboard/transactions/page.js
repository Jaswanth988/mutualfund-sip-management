"use client";

import {
    useEffect,
    useState
} from "react";

import {
    useAuth
} from "@/app/context/authContext";

export default function TransactionsPage() {

    const { user } = useAuth();

    const [transactions, setTransactions] =
    useState([]);

    const [loading, setLoading] =
    useState(true);

    useEffect(() => {

        if(user?.investor_id)
        {
            fetchTransactions();
        }

    }, [user]);

    const fetchTransactions =
    async () => {

        try {

            /* GET PORTFOLIO */

            const portfolioResponse =
            await fetch(
`http://localhost:4000/api/portfolio/investor/${user.investor_id}`
            );

            const portfolioData =
            await portfolioResponse.json();

            const portfolioId =
            portfolioData.portfolio_id;

            /* GET TRANSACTIONS */

            const response =
            await fetch(
`http://localhost:4000/api/sip/transcations/${portfolioId}`
            );

            const data =
            await response.json();

            setTransactions(data);

        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            setLoading(false);
        }
    };

    if(loading)
    {
        return (
            <div className="p-8">
                Loading...
            </div>
        );
    }

    return (

<div className="p-8 min-h-screen bg-[#F5F5F7]">

<h1 className="text-4xl font-bold text-[#6C2CF1] mb-8">
Transactions
</h1>

<div className="bg-white rounded-2xl shadow-sm overflow-hidden">

<table className="w-full">

<thead className="bg-[#EEE8FF]">

<tr>

<th className="p-5 text-left">
ID
</th>

<th className="p-5 text-left">
Type
</th>

<th className="p-5 text-left">
Fund
</th>

<th className="p-5 text-left">
SIP ID
</th>

<th className="p-5 text-left">
Amount
</th>

<th className="p-5 text-left">
NAV
</th>

<th className="p-5 text-left">
Units
</th>

<th className="p-5 text-left">
Date
</th>

</tr>

</thead>

<tbody>

{
transactions.map(
(item) => (

<tr
key={item.transaction_id}
className="border-b hover:bg-gray-50"
>

<td className="p-5">
{item.transaction_id}
</td>

<td className="p-5">

<span
className={`px-3 py-1 rounded-full text-sm font-semibold
${
item.transaction_type === "BUY"
? "bg-green-100 text-green-700"
: item.transaction_type === "SIP_CREATED"
? "bg-purple-100 text-purple-700"
: "bg-blue-100 text-blue-700"
}`}
>

{item.transaction_type}

</span>

</td>

<td className="p-5">
{item.fund_name}
</td>

<td className="p-5">
{
item.sip_id
?
item.sip_id
:
"-"
}
</td>

<td className="p-5 font-semibold">
₹ {item.amount}
</td>

<td className="p-5">
₹ {item.nav_value}
</td>

<td className="p-5">
{
Number(
item.units_allocated
).toFixed(2)
}
</td>

<td className="p-5">
{
new Date(
item.transaction_date
).toLocaleDateString()
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