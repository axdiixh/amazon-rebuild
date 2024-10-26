"use client"

import DeliveryAddress from "../shared/DeliveryAddress";
import OrderSummary from "../shared/OrderSummary";
import amazonLogo from "@/public/assets/amazon-logo.png"
import { FaLock } from "react-icons/fa";
import Image from "next/image"

const Checkout = () => {
    return (
        <div className='absolute top-0 w-full p-5 md:p-10  bg-white'>
            <div className="flex w-full md:w-[70%] mx-auto items-center justify-between border-b pb-5 border-gray-400">
                <div>
                    <Image src={amazonLogo} alt="amazon-logo" className="w-14 md:w-[100px]" />
                </div>
                <div>
                    <h1 className="font-bold text-lg md:text-2xl">Checkout</h1>
                </div>
                <div className="text-gray-400">
                    <FaLock size={30} className="w-5 md:w-20" />
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full md:w-[70%] mx-auto">
                <DeliveryAddress />
                <OrderSummary />
            </div>
        </div>
    )
}

export default Checkout