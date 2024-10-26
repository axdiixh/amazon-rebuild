"use client"

import { supabase } from "@/lib/supabase/products"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Success = () => {
    const [user, setUser] = useState<any>(null)
    const router = useRouter()

    useEffect(() => {
        const getUserData = async () => {
            const { data, error } = await supabase.auth.getUser()
            setUser(data)
        }

        getUserData()
    }, [])

    if (!user) {
        return (
            <div className='absolute top-0 w-full h-full bg-white flex justify-center items-center'>
                <div className='text-center'>
                    <p className="text-lg">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='absolute top-0 w-full h-full bg-white flex justify-center items-center'>
            <div className='text-center'>
                <h1 className="text-2xl md:text-3xl">
                    Thank you, <span className="font-semibold">{user?.user?.identities?.[0]?.identity_data?.full_name}</span>
                </h1>
                <p className="text-base md:text-lg">For Shopping with Us.</p>
                <button
                    className='bg-[#FFD814] px-5 py-1 rounded-md shadow mt-5'
                    onClick={() => {
                        router.push('/')
                    }}
                >Continue Shopping</button>
            </div>
        </div>
    )
}

export default Success
