"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(
          "http://localhost:4000/api/sip/transcations"
        );

        const data = await response.json();

        setTransactions(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  return (
  <>
  <div className="h-[200px] flex flex-row w-[250px] border-2-blue-500 rounded-2xl bg-gray-400 p-8 text-white">
   <p className="flex flex-row text-black  text-[28px] font-bold">Team Payments</p>


  </div>
    <div className="w-full min-h-screen bg-white p-8 text-white">
      <div className="flex items-center justify-between mb-10">

      </div>

      <div className="bg-[#111829] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-pink-400">
            Loading Transactions...
          </div>
        ) : (
          <div className=" absolute bottom-1 overflow-x-auto bg-black">
            <table className="   w-full table-auto ">
              {/* TABLE HEAD */}
              <thead className="bg-black">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">
                    Transaction ID
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">
                    Portfolio ID
                  </th>

                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">
                    Investor Type
                  </th>

                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">
                    Amount
                  </th>

                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">
                    Units
                  </th>

                  <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-800 hover:bg-[#1e293b] transition duration-300"
                    >
                      <td className="px-6 py-5 font-medium">
                        {transaction.transaction_id}
                      </td>
                      <td className="px-6 py-5 font-medium">
                        {transaction.portfolio_id}
                      </td>

                      <td className="px-6 py-5 text-gray-300">
                        {transaction.type || "SIP"}
                      </td>

                      <td className="px-6 py-5 font-bold text-green-400">
                        ₹ {transaction.amount}
                      </td>

                      <td className="px-6 py-5">
                        <span className="px-4 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                          {transaction.units_allocated}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-gray-400">
                        {transaction.transaction_date}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-10 text-gray-500"
                    >
                      No Transactions Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </>
  );
}