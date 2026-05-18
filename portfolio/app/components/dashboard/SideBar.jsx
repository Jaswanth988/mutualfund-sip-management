        "use client";

        import { useState } from "react";
        import {
        GrDashboard,
        GrLogout,
        GrSettingsOption,
        GrUser,
        GrAdd,
        GrMoney,
        } from "react-icons/gr";

        export default function SideBar() {
        const [activeItem, setActiveItem] = useState("Dashboard");

        return (
            <div className="w-[300px] min-h-screen bg-white flex flex-col justify-between px-6 py-5 border-r border-gray-200">
            
            {/* TOP SECTION */}
            <div>
                
                {/* LOGO */}
                <div className="font-bold text-3xl mt-4 text-[#6C2CF1]">
                KFin Wings
                </div>

                {/* MAIN MENU */}
                <div className="flex flex-col mt-12">
                
                <div className="text-gray-400 text-sm font-semibold mb-4">
                    MAIN MENU
                </div>

                <HeaderItem
                    icon={GrDashboard}
                    title="Dashboard"
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />

                <HeaderItem
                    icon={GrUser}
                    title="Investors"
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />

                <HeaderItem
                    icon={GrAdd}
                    title="Add SIP"
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />

                <HeaderItem
                    icon={GrMoney}
                    title="View Transaction"
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
                </div>

                {/* TEAMS */}
                <div className="flex flex-col flex-evenly mt-10">
                
                <div className="text-gray-400 text-sm font-semibold mb-4">
                    TEAMS
                </div>

<div className="w-3 h-3 rounded-full bg-orange-400 flex flex-row">
    <HeaderItem
                    icon={GrDashboard}
                    title="Marketing"
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
</div>
                

<div className="w-3 h-3 rounded-full bg-blue-400 flex flex-row">

                <HeaderItem
                    icon={GrDashboard}
                    title="Development"
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
                </div>

                </div>
            </div>

            <div className="border-t border-gray-200 pt-5">
                
                <HeaderItem
                icon={GrSettingsOption}
                title="Settings"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                />

                <HeaderItem
                icon={GrLogout}
                title="Logout"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                />
            </div>
            </div>
        );
        }

        function HeaderItem({
        icon: Icon,
        title,
        activeItem,
        setActiveItem,
        }) {
        const active = activeItem === title;

        return (
            <div
            onClick={() => setActiveItem(title)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 mb-2
            ${ 
                active
                ? "bg-[#EEE8FF] text-[#6C2CF1] font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            >
            <Icon size={18} />

            <span className="text-[15px]">{title}</span>
            </div>
        );
        }