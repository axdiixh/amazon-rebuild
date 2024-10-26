import React from "react";
import Image from "next/image";
import Rating from "../shared/Rating";
import AddToCart from "../AddToCart";

const SingleProduct = ({ product, loading }: { product: any; loading: boolean }) => {
    if (loading) {
        return (
            <div className="w-[80%] mx-auto mt-10">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="w-[80%] mx-auto mt-10">
            {product && product?.length > 0 ? (
                <div className="flex justify-between">
                    <div>
                        <div className="flex">
                            <div className="bg-gray-100 h-fit">
                                <Image
                                    className="mix-blend-multiply p-2"
                                    src={product?.[0]?.image}
                                    alt={product?.[0]?.title}
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className="mx-4 w-[70%]">
                                <h1 className="font-bold text-lg">{product?.[0]?.title}</h1>
                                <p>{product?.[0]?.description}</p>
                                <Rating ratings={product?.[0]?.rating} />
                                <h1 className="font-bold">{`$${product?.[0]?.price}`}</h1>
                                <div>
                                    <h1 className="font-bold text-sm">About this item</h1>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</li>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddToCart product={product} />
                </div>

            ) : (
                <p>Product not found</p>
            )}
        </div>
    );
};

export default SingleProduct;