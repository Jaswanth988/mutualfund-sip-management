"use client";
import React, { act } from "react";
import { useState } from "react";
export default function DashHeader()
{
    const [activeItem,setActiveItem]=useState("Full Statistics");
    return(
        <div className="relative w-full flex flex-row py-4 px-3 text-black bg-white items-center">
         <div className="text-2xl font-bold ml-[50px] mr-[100px]">Analytics</div>
         <div className="flex flex-row w-[350px]
         bg-gray-300 justify-evenly
         items-center py-1 font-bold text-lg rounded-full">
         <div className={
            activeItem=="Full Statistics"
            ?"bg-white py-1 px-6 rounded-full"
            :null
         }
         onClick={(e)=>{
            setActiveItem("Full Statistics")
         }}>

         </div>
         </div>
        </div>
    )
}