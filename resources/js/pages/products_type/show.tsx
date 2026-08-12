import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import React from 'react';
import { index } from "@/routes/products_type";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tipos de Producto',
        href: index().url,
    },
    {
        title: 'Create Product',
        href: '/products/create',
    },
];

interface ProductType {
    id: number;
    name: string;
    description: string;
}

export default function View({product_type}: {product_type: ProductType}) {

    const {data, setData, post, processing, errors} = useForm({
        name: product_type.name,
        description: product_type.description,
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
                        <Link href="/products_type">
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
                </form>
            </div>
        </AppLayout>
    );
}
function route(arg0: string): string {
    throw new Error('Function not implemented.');
}

