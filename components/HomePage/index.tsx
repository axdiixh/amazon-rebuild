"use client"

import { useSupabase } from "@/lib/supabase/hooks/useSupabase"
import Image from "next/image"
import { useEffect, useState } from "react"
import Link from "next/link"
import CategoryWiseProduct from "../shared/CategoryWiseProduct"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HomePage = () => {
  const { mensProduct, getMensClothing, womensProduct, getWomensClothing } = useSupabase()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await getMensClothing()
      await getWomensClothing()
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div>
      <Image
        src={"https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg"}
        alt="djs"
        width={2000}
        height={1000}
        layout="responsive"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))'
        }}
      />
      <div className="w-[80%] mx-auto grid grid-col-1 md:grid-cols-4 gap-5 md:gap-2 relative -top-24 md:-top-80">
        {loading ? (
          Array(8).fill("").map((_, index) => (
            <div key={index} className="p-4">
              <Skeleton height={350} />
              <Skeleton count={2} />
            </div>
          ))
        ) : (
          <>
            {mensProduct?.map((product: any) => (
              <div key={product.id}>
                <CategoryWiseProduct product={product} />
              </div>
            ))}
            {womensProduct?.map((product: any) => (
              <div key={product.id}>
                <CategoryWiseProduct product={product} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage
