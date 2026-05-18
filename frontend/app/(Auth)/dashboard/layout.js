import SideBar from "@/app/components/dashboard/SideBar";

export default function DashboardLayout({ children }) {

    return (

        <div className="flex min-h-screen bg-[#F5F5F7]">

            {/* SIDEBAR */}
            <SideBar />

            {/* PAGE CONTENT */}
            <div className="flex-1 p-6 overflow-y-auto">
                {children}
            </div>

        </div>
    );
}