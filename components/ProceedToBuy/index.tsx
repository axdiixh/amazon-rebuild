"use client";

import { useState } from 'react';
import Subtotal from '../shared/Subtotal';
import { useRouter } from 'next/navigation';

const ProceedToBuy = ({ length, totalPrice, left }: { length: number, totalPrice: number, left: boolean }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleProceedToBuy = () => {
    setLoading(true);
    router.push('/checkout');
  };

  return (
    <div className='w-full md:w-[20%] h-fit border border-gray-300'>
      <div className='p-4 text-sm'>
        <p>
          <span className='text-[#007600] font-medium'>Your order is eligible for FREE Delivery.</span>
          Choose FREE Delivery option at checkout.
        </p>
        <Subtotal left={left} length={length} totalPrice={totalPrice} />
        <button
          className='bg-[#FFD814] w-full py-1 rounded-md shadow my-3 flex items-center justify-center'
          onClick={handleProceedToBuy}
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">Proceeding...</span>
          ) : (
            "Proceed to Buy"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProceedToBuy;
