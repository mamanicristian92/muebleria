import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleX } from 'lucide-react';
import { update } from '@/actions/App/Http/Controllers/ProductTypeController'; //wayfinder

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Editar Tipo de Producto',
        href: '/products_type/edit',
    },
];


interface ProductType {
    id: number;
    name: string;
    description: string;
}

export default function Edit({product_type}: {product_type: ProductType}) {

    const {data, setData, post, processing, errors} = useForm({
        id: product_type.id,
        name: product_type.name,
        description: product_type.description,
        _method: 'put', //este es :)
    })

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);

        post(update.url(product_type.id), {
            //forceFormData: true,
            //body:data,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Tipo de Producto" />
            <div className='p-4 max-w-md'>
                <form onSubmit={handleUpdate} method='post' className='space-y-4' encType='multipart/form-data'>
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
                        Guardar
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
