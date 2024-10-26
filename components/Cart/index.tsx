"use client"

import ShoppingCart from '../ShoppingCart'
import ProceedToBuy from '../ProceedToBuy'
import { useAppSelector } from '@/lib/supabase/hooks/redux'
import { getCart } from '@/redux/cartSlice'

const Cart = () => {

  const cart = useAppSelector(getCart)
  let totalPrice = 0
  cart.forEach((item: any) => {
    return totalPrice += item.price * item.quantity
  })

  totalPrice = parseFloat(totalPrice.toFixed(2));

  return (
    <div className='mx-5 md:w-[80%] md:mx-auto mt-5 md:mt-10'>
      <div className='w-full flex gap-5 md:gap-0 flex-col md:flex-row justify-between'>
        <ShoppingCart cart={cart} totalPrice={totalPrice} />
        <ProceedToBuy left={true} length={cart.length} totalPrice={totalPrice} />
      </div>
    </div>
  )
}

export default Cart