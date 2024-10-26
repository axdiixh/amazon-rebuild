"use client";

import SingleProduct from "@/components/SingleProduct";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSupabase } from "@/lib/supabase/hooks/useSupabase";

const Page = () => {
  const { id } = useParams();
  const { singleProduct, getSingleProduct } = useSupabase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      await getSingleProduct(Number(id));
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="flex">
      <SingleProduct product={singleProduct} loading={loading} />
    </div>
  );
};

export default Page;
