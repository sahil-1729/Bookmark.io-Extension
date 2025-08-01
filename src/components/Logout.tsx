import { createClient } from "@supabase/supabase-js";
import React from "react";

const supabase = createClient(`${import.meta.env.VITE_SUPABASE_URL}`, `${import.meta.env.VITE_SUPABASE_ANON_KEY}`)

const Logout = () => {
    return (<div>
        Welcome
        <button onClick={() => {
            supabase.auth.signOut()
        }} className="bg-primary text-secondary rounded-md px-4 py-2  mb-2">
            Sign out
        </button>
    </div>)
}

export default Logout