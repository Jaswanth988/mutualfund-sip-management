"use client"
import { useRouter } from "next/navigation";
export default function HomePage() {
  const router=useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100">
      
      <nav className="flex items-center justify-between px-10 py-6">
        <h1 className="text-3xl font-bold text-blue-700">
          SIP MANAGEMENT
        </h1>

        <div className="flex gap-4">
          <button onClick={()=>{
            router.push("/login");
          }} className="px-5 py-2 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition">
            Login
          </button>

          <button className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md">
            Sign Up
          </button>
        </div>
      </nav>  
       </div>
  );
}