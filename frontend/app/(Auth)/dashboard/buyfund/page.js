"use client";

import {
    useEffect,
    useState
} from "react";

import {
    useAuth
} from "@/app/context/authContext";
export default function BuyFundPage() {

    const { user } =
    useAuth();

    const [funds, setFunds] =
    useState([]);

    const [portfolioId,
    setPortfolioId] =
    useState(null);

    const [loading,
    setLoading] =
    useState(false);

    const [message,
    setMessage] =
    useState("");

    const [showLumpsum,
    setShowLumpsum] =
    useState(false);

    const [selectedFund,
    setSelectedFund] =
    useState(null);

    const [lumpsumAmount,
    setLumpsumAmount] =
    useState("");

    const [showSipForm,
    setShowSipForm] =
    useState(false);

    const [sipData,
    setSipData] =
    useState({
        sip_id: "",
        portfolio_id: "",
        fund_id: "",
        sip_amount: "",
        frequency: "MONTHLY",
        start_date: "",
        status: "ACTIVE"
    });

    useEffect(() => {

        fetchFunds();

    }, []);

    useEffect(() => {

        if(user?.investor_id)
        {
            fetchPortfolio();
        }

    }, [user]);

    const fetchPortfolio =
    async () => {

        try {

            const response =
            await fetch(
`http://localhost:4000/api/portfolio/investor/${user.investor_id}`
            );

            const data =
            await response.json();

            setPortfolioId(
                data.portfolio_id
            );

        }
        catch(error)
        {
            console.log(error);
        }
    };

    const fetchFunds =
    async () => {

        try {

            const response =
            await fetch(
"http://localhost:4000/api/funds/funds"
            );

            const data =
            await response.json();

            setFunds(data);

        }
        catch(error)
        {
            console.log(error);
        }
    };

    const openLumpsumModal =
    (fund) => {

        setSelectedFund(fund);

        setShowLumpsum(true);

        setShowSipForm(false);

        setLumpsumAmount("");
    };

    const openSipForm =
    (fund) => {

        setSelectedFund(fund);

        setSipData({

            sip_id:
            Math.floor(
                Math.random() * 100000
            ),

            portfolio_id:
            portfolioId,

            fund_id:
            fund.fund_id,

            sip_amount: "",

            frequency:
            "MONTHLY",

            start_date: "",

            status:
            "ACTIVE"
        });

        setShowSipForm(true);

        setShowLumpsum(false);
    };

    const buyFund =
    async () => {

        try {

            setLoading(true);

            const response =
            await fetch(
"http://localhost:4000/api/funds/buy",
{
    method: "POST",

    headers: {
        "Content-Type":
        "application/json"
    },

    body: JSON.stringify({

        portfolio_id:
        portfolioId,

        fund_id:
        selectedFund.fund_id,

        amount:
        lumpsumAmount
    })
}
            );

            const data =
            await response.json();

            if(response.ok)
            {
                setMessage(
                    "Fund Purchased Successfully"
                );

                setShowLumpsum(false);
            }
            else
            {
                setMessage(
                    data.error
                );
            }

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

    const handleSipChange =
    (e) => {

        setSipData({
            ...sipData,
            [e.target.name]:
            e.target.value
        });
    };

    const handleSipSubmit =
    async (e) => {

        e.preventDefault();

        try {

            const response =
            await fetch(
"http://localhost:4000/api/sip/addsip",
{
    method: "POST",

    headers: {
        "Content-Type":
        "application/json"
    },

    body: JSON.stringify(
        sipData
    )
}
            );

            const data =
            await response.json();

            if(response.ok)
            {
                setMessage(
                    "SIP Added Successfully"
                );

                setShowSipForm(false);
            }
            else
            {
                setMessage(
                    data.error
                );
            }

        }
        catch(error)
        {
            console.log(error);
        }
    };

    return (

<div className="p-8">

<h1 className="text-4xl font-bold text-[#6C2CF1] mb-8">
Mutual Funds
</h1>

{
message && (

<div className="bg-[#EEE8FF] p-4 rounded-xl mb-5 text-[#6C2CF1]">
{message}
</div>
)
}

<div className="grid grid-cols-3 gap-6">

{
funds.map((fund) => (

<div
key={fund.fund_id}
className="bg-white p-6 rounded-2xl shadow-sm"
>

<h2 className="text-2xl font-bold">
{fund.fund_name}
</h2>

<p className="mt-2">
{fund.category}
</p>

<p className="mt-4 text-3xl font-bold text-[#6C2CF1]">
₹ {fund.latest_nav}
</p>

<div className="flex gap-4 mt-6">

<button
onClick={() =>
openLumpsumModal(
fund
)
}
className="flex-1 bg-[#6C2CF1] text-white py-3 rounded-xl"
>
Buy
</button>

<button
onClick={() =>
openSipForm(
fund
)
}
className="flex-1 border border-[#6C2CF1] text-[#6C2CF1] py-3 rounded-xl"
>
SIP
</button>

</div>

</div>
))
}

</div>

{
showLumpsum && (

<div className="bg-white p-8 rounded-2xl shadow-sm mt-10 max-w-xl">

<h2 className="text-3xl font-bold mb-5 text-[#6C2CF1]">
Buy Fund
</h2>

<input
type="number"
placeholder="Enter Amount"
value={lumpsumAmount}
onChange={(e) =>
setLumpsumAmount(
e.target.value
)
}
className="w-full border p-4 rounded-xl"
/>

<button
onClick={buyFund}
className="w-full bg-[#6C2CF1] text-white py-4 rounded-xl mt-5"
>

{
loading
?
"Processing..."
:
"Invest Now"
}

</button>

</div>
)
}

{
showSipForm && (

<form
onSubmit={handleSipSubmit}
className="bg-white p-8 rounded-2xl shadow-sm mt-10 grid grid-cols-2 gap-5"
>

<input
type="number"
name="sip_amount"
placeholder="SIP Amount"
onChange={
handleSipChange
}
className="border p-3 rounded-xl"
/>

<select
name="frequency"
onChange={
handleSipChange
}
className="border p-3 rounded-xl"
>

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
onChange={
handleSipChange
}
className="border p-3 rounded-xl"
/>

<button
type="submit"
className="col-span-2 bg-[#6C2CF1] text-white py-4 rounded-xl"
>
Create SIP
</button>

</form>
)
}

</div>
    );
}