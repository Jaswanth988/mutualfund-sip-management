"use client";

import { useEffect, useState } from "react";

function Page() {

    const [data, setData] = useState([]);

    useEffect(() => {

        fetch("http://localhost:4000/api/investor/holdings/:id", {
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
        <div>
            {JSON.stringify(data)}
        </div>
    );
}

export default Page;