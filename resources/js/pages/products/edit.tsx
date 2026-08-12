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
import { index, edit, update} from "@/routes/products";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Producto',
        href: index().url,
    },
    {
        title: 'Editar',
        href: index().url,
    },
];

interface Product {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: number;
    product_type_id: number;
    type: {
        id: number;
        name: string;
    };
    photos: Array<{
        id: number;
        url: string;
    }>;
}

interface ProductType {
    id: number;
    name: string;
    description: string;
}

export default function Edit({product, productTypes}: {product: Product, productTypes: ProductType[]}) {

    const {data, setData, post, processing, errors} = useForm({
        id: product.id,
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
        product_type_id: product.product_type_id,
        photos: product.photos,
        deleted_photos: [] as number[],
        new_photos: [],
        _method: 'put', //este es :)
    })

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log(data);

        //post(route('products.update', product.id), {
        post(update(product.id).url, {
            //forceFormData: true,
            //body:data,
        });
    }

    const handleDeletePhoto = (photoId: number) => {
        // Remove photo from photos array
        setData('photos', data.photos.filter(photo => photo.id !== photoId));
        // Add photo id to deleted_photos array
        setData('deleted_photos', [...data.deleted_photos, photoId]);
        console.log(data.deleted_photos);
        console.log(data);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(data);
        if (e.target.files) {
            setData('new_photos', e.target.files);
        }
        console.log(data);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products | Create" />
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
                        <Input
                            placeholder='Stock'
                            value={data.stock}
                            onChange={e => setData('stock', e.target.value)}
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
                            onChange={e => setData('price', e.target.value)}
                        ></Input>
                        {errors.price && (
                            <div className='flex items-center text-red-500 text-sm mt-1'>
                                {errors.price}
                            </div>
                        )}
                    </div>
                    <div className='gap-1.5'>
                        <Select
                            onValueChange={value => setData('product_type_id', value)}
                            value={data.product_type_id.toString()}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Tipo de Producto" />
                            </SelectTrigger>
                            <SelectContent>
                                {<SelectItem
                                    key="0"
                                    value="0">
                                    {"Tipo de producto"}
                                </SelectItem>}
                                {productTypes.map((type) => (
                                    <SelectItem
                                        key={type.id}
                                        value={type.id.toString()}>
                                        {type.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.product_type_id && (
                            <div className='flex items-center text-red-500 text-sm mt-1'>
                                {errors.product_type_id}
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

                    {/* Agregar nuevas fotos */}
                    <div className='gap-1.5'>
                        <Input
                            className="text-gray-700"
                            type='file'
                            onChange={handleFileChange}
                            multiple
                        ></Input>
                        {errors.new_photos && (
                            <div className='flex items-center text-red-500 text-sm mt-1'>
                                {errors.new_photos}
                            </div>
                        )}
                    </div>

                    {/* eliminar fotos */}
                    <div className='gap-1.5'>
                        {data.photos.length > 0 && (
                            <div className='flex flex-wrap gap-2 mb-2'>
                                {data.photos.map((photo, index) => (
                                    <div className="relative"
                                        key={index}
                                        >
                                        <img
                                            src={"/"+photo.url}
                                            alt={`Preview ${index + 1}`}
                                            className='w-50 h-50 object-cover rounded-md'
                                        />
                                        <button className="absolute top-1 right-1 bg-white rounded-2xl text-black"
                                            type="button"
                                            onClick={() => handleDeletePhoto(photo.id)}
                                        >
                                            <CircleX size={20}/>
                                        </button>
                                    </div>
                                ))}
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
