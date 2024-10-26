"use client"

import React from 'react'
import Image from 'next/image'
import { useAppDispatch } from '@/lib/supabase/hooks/redux'
import { clearAllCart, removeFromCart } from '@/redux/cartSlice'
import { decrementQuantity } from '@/redux/cartSlice'
import { incrementQuantity } from '@/redux/cartSlice'
import Subtotal from '../shared/Subtotal'

const ShoppingCart = ({ cart, totalPrice }: { cart: any, totalPrice: number }) => {

    const dispatch = useAppDispatch()

    return (
        <div className='w-full md:w-[70%]'>
            <div className='flex justify-center md:justify-between md:items-center border-b border-gray-300 py-3 md:py-5'>
                <h1 className='font-bold text-2xl'>Shopping Cart</h1>
                <p className='font-bold hidden md:block'>Price</p>
            </div>
            {cart?.map((product: any, index: any) => {
                return (
                    <div key={index} className='my-4 flex flex-col md:flex-row justify-between border-b py-1 border-gray-200'>
                        <div className='flex'>
                            <div>
                                <Image src={product?.image} alt={product?.title} width={100} height={100} />
                            </div>
                            <div className='ml-2 '>
                                <h1 className='font-medium'>{product?.title}</h1>
                                <p className='text-[#007600] font-bold my-1 text-xs'>In stock</p>
                                <h1 className='font-bold text-red-600 cursor-pointer w-fit'
                                    onClick={() => {
                                        dispatch(removeFromCart(product?.id))
                                    }}
                                >REMOVE</h1>
                                <div className='flex items-center justify-between gap-5 w-fit text-xl my-4 font-medium bg-gray-200 rounded-md px-5 py-1'>
                                    <div
                                        className='cursor-pointer'
                                        onClick={() => {
                                            product.quantity > 1 && dispatch(decrementQuantity(product))
                                        }}>-</div>
                                    <div>{product.quantity}</div>
                                    <div
                                        className='cursor-pointer'
                                        onClick={() => {
                                            dispatch(incrementQuantity(product))
                                        }}
                                    >+</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className='font-bold text-xl'>{`$${product?.price}`}</h1>
                            <p className='text-xs py-1'>M.R.P.: <span className='line-through'>Rs.3,995.00</span></p>
                        </div>
                    </div>
                )
            })}
            <h1
                className='font-bold text-red-600 cursor-pointer mt-4 w-fit'
                onClick={() => {
                    dispatch(clearAllCart())
                }}
            >
                CLEAR ALL</h1>
            <Subtotal length={cart.length} totalPrice={totalPrice} left={false} />
        </div>
    )
}

export default ShoppingCart