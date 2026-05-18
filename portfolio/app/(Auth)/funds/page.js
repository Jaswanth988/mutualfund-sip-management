"use client";

import { useEffect, useState } from "react";

function Page() {

    const [data, setData] = useState([]);

    useEffect(() => {

        fetch("http://localhost:4000/api/funds/funds", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            setData(result);
        })
        .catch((error) => {
            console.log(error);
            alert(JSON.stringify(error));
        });

    }, []);

   return (
  <table border="1" cellPadding="8">
    <thead>
      <tr>
        <th>Fund Name</th>
        <th>Category</th>
        <th>Risk</th>
        <th>NAV</th>
      </tr>
    </thead>
    <tbody>
      {data.map((fund) => (
        <tr key={fund.fund_id}>
          <td>{fund.fund_name}</td>
          <td>{fund.category}</td>
          <td>{fund.risk_level}</td>
          <td>{fund.latest_nav}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
}

export default Page;