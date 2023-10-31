"use client"
import React, { useEffect, useState } from "react";
import { Header, Loader } from "../../components";
import { useAuth } from '../../context/AuthContext.jsx';
import { AddressCard, AddressForm } from "../../components";

const Profile = () => {

    // API GATEWAY URL
    const gatewayApiUrl = process.env.NEXT_PUBLIC_GATEWAY_API_URL;

    // User
    const { user } = useAuth();

    // Adding address form
    const [showAddressForm, setShowAddressForm] = useState(false);

    // Getting user address
    const [userAddresses, setUserAddresses] = useState([]);
    useEffect(() => {
        const fetchUserAddresses = async () => {
            const response = await fetch(`${gatewayApiUrl}/address/${user.uid}`);
            const data = await response.json();
            setUserAddresses(data);
        };
        if(!user) return;

        fetchUserAddresses();
    }, [user]);

    // Loader
    if (!user) {
        return <Loader />;
    }

    return (
        <>
            <Header slug={"/"} />
            <AddressForm showAddressForm={showAddressForm} setShowAddressForm={setShowAddressForm} />

            <div className="container mx-auto px-6 md:px-0">
                <div className="grid grid-cols-1">
                    <div className="flex justify-center py-6">
                        <span className="text-4xl md:text-4xl lg:text-5xl font-semibold mb-4 text-dark-slate-blue">
                            Your account
                        </span>
                    </div>

                    <div className="grid grid-cols-3 w-full rounded-3xl bg-cream-primary">
                        <div className="col-span-3 md:col-span-1 py-8 md:py-24 px-4 flex justify-center bg-gray-100 flex-col">
                            <div className="w-full flex justify-center">
                                <img
                                    src={user.photoURL ? user.photoURL : "/profileIcon.png"}
                                    className="border border-8 align-middle mx-6 font-semibold rounded-full my-2"
                                    alt="profile"
                                    width="200px"
                                    height="200px"
                                />
                            </div>
                            <div className="flex justify-center items-center justify-items-center pt-2 px-4">
                                <span className="text-3xl md:text-lg lg:text-3xl font-semibold text-dark-slate-blue flex justify-center items-center justify-items-center justify-self-center">
                                    <center>{user.displayName}</center>
                                </span>
                            </div>
                        </div>
                        <div className="col-span-3 md:col-span-1 md:py-2">

                            <div className="flex flex-col justify-center px-4 mb-8">
                                <span className="text-xl md:text-3xl lg:text-3xl font-semibold mb-4 py-2 bg-orange-500 text-white px-4 py-2 w-full">
                                    Your information
                                </span>

                                <div className="flex flex-col pt-2 px-4">
                                    <span className="text-3xl md:text-lg lg:text-3xl px-4 mb-2">
                                        Addresses
                                    </span>
                                    <div className="flex flex-col items-center justify-center">
                                        {userAddresses.map((address, index) => (
                                            <AddressCard key={index} name={address.name} address={address.address} address_details={address.address_details} phone={address.phone} city={address.city} />
                                        ))}
                                        <span onClick={(e) => setShowAddressForm(true)} className="cursor-pointer hover:underline">+ Add Address</span>
                                    </div>

                                </div>
                            </div>


                        </div>

                        <div className="col-span-3 md:col-span-1 md:py-2">

                            <div className="flex justify-center px-4 mb-8">
                                <span className="text-xl md:text-3xl lg:text-3xl font-semibold mb-4 py-2 bg-orange-500 text-white px-4 py-2 w-full">
                                    Orders history
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

const info = {
    name: "John Doe",
    address: "1234 Main St",
    address_details: "Apt 123",
    phone: "123-456-7890",
    city: "Cali",
}

export default Profile;