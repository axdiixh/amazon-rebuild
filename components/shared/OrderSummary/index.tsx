import { useState } from 'react';
import { useAppSelector } from '@/lib/supabase/hooks/redux';
import { supabase } from '@/lib/supabase/products';
import { getCart } from '@/redux/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const OrderSummary = () => {
    const cart = useAppSelector(getCart);
    const [loading, setLoading] = useState(false);

    let totalPrice = 0;
    cart.forEach((item: any) => {
        totalPrice += item.price * item.quantity;
    });

    totalPrice = parseFloat(totalPrice.toFixed(2));

    const createStripeSession = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        const stripe = await stripePromise;

        try {
            const checkoutSession = await axios.post('/api/checkout-sessions', {
                items: cart,
                email: user?.email,
            });

            const res = await stripe?.redirectToCheckout({
                sessionId: checkoutSession?.data?.id,
            });

            if (res?.error) {
                console.log(res?.error?.message);
            }
        } catch (error) {
            console.error("Error creating Stripe session:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='border border-gray p-4 mt-5 h-fit'>
            <div>
                <h1 className='font-bold'>Order Summary</h1>
                <div className='text-sm mt-5 mb-3 space-y-1'>
                    <div className='flex items-center justify-between'>
                        <p>Items:</p>
                        <p>{`${cart.length} Items`}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p>Delivery:</p>
                        <p className='underline'>FREE</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p>Total:</p>
                        <p>{totalPrice}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p>Promotion Applied:</p>
                        <p>NONE</p>
                    </div>
                </div>
                <div className='flex justify-between text-lg font-bold text-[#B12704] border-t border-b border-gray-300 mb-3'>
                    <p>Order Total:</p>
                    <p>{totalPrice}</p>
                </div>
                <button
                    className={`bg-[#FFD814] w-full min-w-[200px] rounded-md px-4 py-1 flex items-center justify-center ${loading ? 'cursor-not-allowed' : ''}`}
                    onClick={createStripeSession}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="animate-pulse">Placing your Order...</span>
                    ) : (
                        "Place your Order Now"
                    )}
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;

