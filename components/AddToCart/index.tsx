import React from 'react'
import Image from 'next/image'
import prime from '@/public/assets/prime-logo.png'
import { useAppDispatch } from '@/lib/supabase/hooks/redux'
import { addToCart } from '@/redux/cartSlice'
import { useRouter } from 'next/navigation'

const AddToCart = ({product}: {product: any}) => {

    const dispatch = useAppDispatch()
    const router = useRouter()

    return (
        <div className='border border-gray-300 rounded-md h-fit text-sm'>
            <div className="p-4">
                <Image src={prime} width={40} height={40} alt='prime' />
            </div>
            <div className='p-4 '>
                <h1><span className='text-[#147C8F]'>FREE delivery</span> Sunday, 22 September. <span className='text-[#147C8F]'>Details</span></h1>
                <h1 className='mt-4'>Or fastest delivery<span className='font-bold'> Tomorrow, 21 September</span>. Order within 15 hrs 53 mins. Details</h1>
                <p className='text-[#147C8F] my-2'>Deliver to Lahore - Islamabad 144411</p>
                <button
                    className='bg-[#FFD814] w-full rounded-full py-1 shadow'
                    onClick={() => {
                        dispatch(addToCart(product?.[0]))
                        router.push('/cart')
                    }}
                >Add to Cart</button>
                <button className='bg-[#FFA41C] w-full rounded-full py-1 my-2 shadow'>Buy Now</button>
            </div>
        </div>
    )
}

export default AddToCart