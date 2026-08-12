import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
//import route from 'ziggy-js';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import React from 'react';
import { useState } from 'react';
import { index, create, store} from '@/actions/App/Http/Controllers/ProductTypeController'; //wayfinder


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tipos de Producto',
        href: index.url(),
    },
    {
        title: 'Crear Tipo',
        href: create.url(),
    },
];

interface ProductType {
    id: number;
    name: string;
    description: string;
}

export default function Create({productTypes}: {productTypes: ProductType[]}) {

    const {data, setData, post, processing, errors} = useForm({
        name: '',
        description: '',
    })

    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(store.url());
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Tipo de Producto" />
            <div className='p-4 max-w-md'>
                <form onSubmit={handleSubmit} method='post' className='space-y-4' encType='multipart/form-data'>
                    <div className='gap-1.5'>
                        <Input
                            placeholder='Nombre'
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
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
                            onChange={e => setData('description', e.target.value)} 
                        />
                        {errors.description && (
                            <div className='flex items-center text-red-500 text-sm mt-1'>
                                {errors.description}
                            </div>
                        )}
                    </div>
                    <Button disabled={processing} type='submit'>
                        Create Product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
