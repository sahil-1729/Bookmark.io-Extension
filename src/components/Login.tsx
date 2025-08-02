import { Session } from "@supabase/supabase-js"
import React, { useEffect, useState } from "react"
import Logout from "./Logout"
import { supabase } from "@/utils/createClient"


const Login = () => {

    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedResult = { ...formData, [e.target.name]: e.target.value }
        setFormData(updatedResult);
    }

    const signin = async () => {

        // console.log(formData)

        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        })

        // console.log(data)
        if (error) {
            console.log(error)
        }

        if (data.user?.email) {
            console.log("verified")
        }
    }



    return session ? <Logout />
        :
        (<div className="">
            <div className="w-full p-8 rounded-lg border-2 border-primary px-8 sm:max-w-md mx-auto mt-4">
                <form action="/addBookmark"
                    onSubmit={(e) => {
                        // console.log(formData)
                        signin()
                        e.preventDefault()

                    }}
                    className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4">
                    <label className="text-md" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md px-4 py-2  border-2 border-primary mb-6"
                        name="email"
                        type="email"
                        placeholder=""
                        required
                        onChange={(e) => {
                            onChange(e)
                        }}
                    />
                    <label className="text-md" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2  border-2 border-primary mb-6"
                        type="password"
                        name="password"
                        placeholder=""
                        required
                        onChange={(e) => {
                            onChange(e)
                        }}
                    />
                    <button type="submit" className="bg-primary text-secondary rounded-md px-4 py-2  mb-2">
                        Sign In
                    </button>
                </form>

                <a
                    href="/signup"
                    className="rounded-md no-underline text-foreground text-sm"
                >
                    Don&apos;t have an Account? Sign Up
                </a>
                <br />

                <h1 className='text-2xl text-center my-4'>
                    OR
                </h1>

                <div className="flex justify-center">
                    <button className="bg-primary text-secondary rounded-md px-4 py-2 mb-2 flex flex-row gap-2 ">
                        <p className="text-md md:text-lg" >
                            Login using Google
                        </p>
                    </button>
                </div>


            </div>
        </div>)
}

export default Login