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
        <div className="w-full md:w-[80%] mx-5 md:mx-auto mt-10">
            {product && product?.length > 0 ? (
                <div className="flex flex-col md:flex-row justify-between">
                    <div>
                        <div className="flex flex-col mb-5 md:mb-0 md:flex-row">
                            <div className="flex justify-center bg-gray-100 h-fit">
                                <Image
                                    className="mix-blend-multiply p-2"
                                    src={product?.[0]?.image}
                                    alt={product?.[0]?.title}
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className="md:mx-4 mt-5 md:mt-0 w-full md:w-[70%]">
                                <h1 className="font-bold text-lg">{product?.[0]?.title}</h1>
                                <p>{product?.[0]?.description}</p>
                                <Rating ratings={product?.[0]?.rating} />
                                <h1 className="font-bold">{`$${product?.[0]?.price}`}</h1>
                                <div>
                                    <h1 className="font-bold text-sm">About this item</h1>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.</li>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.</li>
                                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.</li>
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
