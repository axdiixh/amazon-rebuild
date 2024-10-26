"use client";

import amazonLogo from '@/public/assets/amazon-logo-2.webp';
import Image from 'next/image';
import { BiCart } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/supabase/hooks/redux';
import { getCart } from '@/redux/cartSlice';
import { supabase } from '@/lib/supabase/products';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const itemList = [
    "All",
    "Fresh",
    "Amazon miniTV",
    "Sell",
    "Gift Cards",
    "Baby",
    "Buy Again",
    "Browsing History",
    "Amazon Pay",
    "Gift Ideas",
    "Health Household & Personal Care",
];

const Header = () => {
    const [query, setQuery] = useState<string>("");
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const cart = useAppSelector(getCart);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const searchHandler = () => {
        if (query.trim()) {
            router.push(`/search/${query}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchHandler();
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const getUserData = async () => {
            const { data, error } = await supabase.auth.getUser();
            setUser(data?.user);
        };

        getUserData();
    }, []);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setUser(null); // Reset user to null after successful sign-out
            router.push("/signin");
        }
    };

    return (
        <>
            <div className='bg-[#131921] text-white py-1'>
                <div className="flex items-center justify-between w-[90%] mx-auto">
                    <Link href={'/'} className='w-[10%]'>
                        <Image src={amazonLogo} width={150} height={150} alt='Logo' />
                    </Link>
                    <div className='w-[60%] flex items-center'>
                        <input
                            value={query}
                            type='text'
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown} 
                            className='w-full p-2 rounded-l-md outline-none text-black'
                            placeholder='Search amazon.in'
                        />
                        <div onClick={searchHandler} className='bg-[#FEBD69] p-2 rounded-r-md cursor-pointer hover:bg-opacity-[75%]'>
                            <CgSearch size={24} />
                        </div>
                    </div>
                    <div className='flex items-center justify-between w-[20%]'>
                        <div
                            className='cursor-pointer hidden md:block'
                            onClick={() => !user && router.push("/signin")}
                        >
                            <h1 className={`text-xs ${user ? "" : "hover:underline"}`}>
                                {user ? user.identities?.[0]?.identity_data?.full_name : "Signin"}
                            </h1>
                            <h1 className='font-medium text-sm'>Account & Lists</h1>
                        </div>
                        <div className='hidden md:block'>
                            <p className='text-xs'>Returns</p>
                            <p className='font-medium text-sm'>& Orders</p>
                        </div>
                        <Link href={'/cart'} className='cursor-pointer'>
                            <span className='relative top-3 left-5'>{cart.length}</span>
                            <div className='flex'>
                                <div>
                                    <BiCart size={40} />
                                </div>
                                <h1 className='mt-4'>cart</h1>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='bg-[#232F3E] w-full text-white p-1 flex justify-between items-center'>
                <div className={`flex ${isMenuOpen ? "flex-col w-full" : ""}`}>
                    <div className={`md:hidden cursor-pointer p-2`} onClick={toggleMenu}>
                        {isMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
                    </div>
                    {isMenuOpen && (
                        <div className="flex flex-col md:hidden">
                            <div className='cursor-pointer px-3' onClick={() => !user && router.push("/signin")}>
                                <h1 className={`text-xs ${user ? "" : "hover:underline"}`}>
                                    {user ? user.identities?.[0]?.identity_data?.full_name : "Signin"}
                                </h1>
                                <h1 className='font-medium text-sm'>Account & Lists</h1>
                            </div>
                            <div className='px-3'>
                                <p className='text-xs'>Returns</p>
                                <p className='font-medium text-sm'>& Orders</p>
                            </div>
                        </div>
                    )}
                    <div className={`flex-col md:flex md:flex-row ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                        {itemList.map((link, index) => (
                            <p key={index} className='border border-transparent hover:border-white mx-2 p-1'>
                                {link}
                            </p>
                        ))}
                    </div>
                </div>
                <div className={`mr-5 ${isMenuOpen ? "hidden" : ""}`}>
                    {user ? (
                        <button className='text-[#FEBD69] font-bold hover:underline' onClick={signOut}>
                            Sign out
                        </button>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default Header;


