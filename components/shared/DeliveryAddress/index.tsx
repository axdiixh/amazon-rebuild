"use client"

import { useAppSelector } from "@/lib/supabase/hooks/redux";
import { getCart } from "@/redux/cartSlice";
import Image from "next/image";

const DeliveryAddress = () => {

    const cart = useAppSelector(getCart)

    return (
        <div className="w-full md:w-[60%]">
            <div className="border-b border-gray-300 py-2">
                <div className="flex justify-between">
                    <h1 className="font-bold text-lg">1. Delivery Address</h1>
                    <p className="text-sm w-[25%]">
                        Lorem Ipsum
                        has been the industrys standard dummy text
                        when an unknown printer took a galley of type
                    </p>
                </div>
            </div>
            <div className="border-b border-gray-300 py-2">
                <div className="flex justify-between w-full md:w-[50%]">
                    <h1 className="font-bold text-lg">2. Items and delivery</h1>
                </div>
                {cart?.map((product: any) => {
                    return (
                        <div className="my-4">
                            <div className="flex flex-col items-center md:items-start md:flex-row">
                                <Image src={product.image} alt={product.title} width={150} height={150} />
                                <div className="ml-4">
                                    <h1 className="text-center md:text-start font-bold">{product.title}</h1>
                                    <p className="text-2xl text-center md:text-start font-bold py-2">{`$${product.price} x ${product.quantity}`}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DeliveryAddress