"use client"

import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import NavigationMenuDemo from "@/pages/main/navigation-menu-demo";
import { Head, Link, usePage } from '@inertiajs/react';
import { Url } from '@/types';
import { show } from "@/routes/products";
import Pagination from '@/components/pagination';

interface Product {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: number;
    photos: Array<{
        id: number,
        url: string
    }>;
    photo_url: string;
    type: any;
}
interface ProductsPaginated {
    data: Product[];
    links: Url[];
}

export default function Home({ productsPaginated }: { productsPaginated: ProductsPaginated }) {
    const isMobile = useIsMobile()
    { console.log(productsPaginated.data) }
    return (
        <div>
            <Head title="El Progreso Muebles">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-stone-100">

                <NavigationMenuDemo />

                <div className="flex min-h-screen justify-center">
                    <div className="lg:w-3/4 min-h-full">
                        <div>
                            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl">
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Agregados recientemente</h2>

                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-4">
                                    {productsPaginated.data.map((product) => (
                                        <div key={product.id} className="bg-white rounded-sm shadow-sm">
                                            <a href={show(product.id).url}>
                                                <div className="aspect-square w-full bg-stone-100 hover:opacity-80 content-center">
                                                    <img
                                                        alt={"product: " + product.id}
                                                        src={"storage/" + (product.photos[0] !== undefined ? product.photos[0].url : "")}
                                                        className="h-full mx-auto"
                                                    />
                                                </div>
                                                <div className="mt-4 p-2">
                                                    <div>
                                                        <h3 className="text-sm text-gray-700">
                                                                <span aria-hidden="true" className="" />
                                                                {product.name}
                                                                
                                                        </h3>
                                                        {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-900">$ {new Intl.NumberFormat().format(product.price)}</p>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='my-2'>
                            <Pagination links={productsPaginated.links} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

