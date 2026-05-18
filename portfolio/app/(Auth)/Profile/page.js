"use client"
import { useContext } from "react";
import ProfileContext from "../../core/contexts/ProfileContext";
function page() {
    const { id, password } = useContext(ProfileContext);
    return (
        <div>
            {id}
            {password}
        </div>
    )
}

export default page
