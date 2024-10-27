"use client"

import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '@/lib/supabase/products'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const Signin = () => {
    return (
        <div className='absolute top-0 w-full h-full bg-white p-12'>
            <div className='flex items-center justify-center h-full'>
                <div className='w-full md:w-[25%] mx-auto'>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Signin