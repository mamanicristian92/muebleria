import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CircleX } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: '/products/create',
    },
];

interface Product {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: number;
    type: {
        id: number;
        name: string;
    };
    photos: Array<{
        id: number;
        url: string;
    }>;
}

export default function View({product}: {product: Product}) {

    const {data, setData, post, processing, errors} = useForm({
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
        type: product.type,
        photos: product.photos,
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('products.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products | Create" />
            <div className='p-4 max-w-md'>
                <div className="my-4">
                    <Button asChild
                        size="sm"
                        >
                        <Link href="/products">
                            Volver
                        </Link>
                    </Button>
                </div>
                <form onSubmit={handleSubmit} method='post' className='space-y-4' encType='multipart/form-data'>
                    <div className='gap-1.5'>
                        <Input
                            placeholder='Nombre'
                            value={data.name}
                            disabled
                        ></Input>
                        {errors.name && (
                            <div className='flex items-center text-red-500 text-sm mt-1'>
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className='gap-1.5'>
                        <Input
                            placeholder='Stock'
                            value={data.stock}
                            disabled
                        ></Input>
                        {errors.stock && (
                            <div className='flex items-center text-red-500 text-sm mt-1'>
                                {errors.stock}
                            </div>
                        )}
                    </div>
                    <div className='gap-1.5'>
                        <Input
                            placeholder='Precio'
                            value={data.price}
                            disabled
                        ></Input>
                        {errors.price && (
                            <div className='flex items-center text-red-500 text-sm mt-1'>
                                {errors.price}
                            </div>
                        )}
                    </div>
                    <div className='gap-1.5'>
                        <Input
                            placeholder='Precio'
                            value={data.type.name}
                            disabled
                        ></Input>
                        {errors.price && (
                            <div className='flex items-center text-red-500 text-sm mt-1'>
                                {errors.price}
                            </div>
                        )}
                    </div>
                    <div className='gap-1.5'>
                        <Textarea 
                            placeholder="Descripción"
                            value={data.description}
                            disabled
                        />
                        {errors.description && (
                            <div className='flex items-center text-red-500 text-sm mt-1'>
                                {errors.description}
                            </div>
                        )}
                    </div>
                    <div className='gap-1.5'>
                        {data.photos.length > 0 && (
                            <div className='flex flex-wrap gap-2 mb-2'>
                                {data.photos.map((photo, index) => (
                                    <div className="relative">
                                        <img
                                            key={index}
                                            src={"/"+photo.url}
                                            alt={`Preview ${index + 1}`}
                                            className='w-50 h-50 object-cover rounded-md'
                                        />
                                        {/* <button className="absolute top-1 right-1 bg-white rounded-2xl text-black">
                                            <CircleX size={20}/>
                                        </button> */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
function route(arg0: string): string {
    throw new Error('Function not implemented.');
}

