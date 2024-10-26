import { useState } from "react";
import Image from "next/image";
import Rating from "../Rating";
import { addToCart } from "@/redux/cartSlice";
import { useAppDispatch } from "@/lib/supabase/hooks/redux";
import { useRouter } from "next/navigation";

const CategoryWiseProduct = ({ product }: { product: any }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    dispatch(addToCart(product));
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLoading(false);
    router.push('/cart');
  };

  return (
    <div className='border border-gray-300 p-2 bg-white'>
      <h1 className="capitalize font-bold">{product.category}</h1>
      <div className="mt-2 h-[250px] overflow-hidden flex items-center justify-center">
        <Image src={product.image} className="p-6 max-h-[250px]" width={200} height={150} alt={product.title} />
      </div>
      <div>
        <h1>{product.title}</h1>
        <Rating ratings={product.rating} />
      </div>
      <div className="my-2">
        <button
          className="w-full py-2 rounded-md bg-[#FFD814] flex items-center justify-center"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? (
            <span className="animate-pulse">Adding...</span>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}

export default CategoryWiseProduct;
