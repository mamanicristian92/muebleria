import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, ProductType, Url } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Pagination from '@/components/pagination';
import PdfButton from '@/components/ui/pdf-button';
import ExcelButton from '@/components/ui/excel-button';
//import { route } from 'ziggy-js';
import { index, create, show, edit, destroy as deleteProduct } from '@/actions/App/Http/Controllers/ProductTypeController';
import {report_all, report, exportexcel } from "@/routes/products";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: index.url(),
    },
];

interface ProductsTypePaginated {
    data: ProductType[];
    links: Url[];
}

export default function Index({products_type}: {products_type: ProductsTypePaginated}) {
    const {processing, delete: destroy} = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product')) {
            destroy(deleteProduct.url(id))
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-row">
                    <div className="p-2">
                        <Link href={create.url()}
                            className="w-32">
                            <Button className='mb-4'>
                                Creaar Tipo
                            </Button>
                        </Link>
                    </div>
                    <div className="p-2">
                        <PdfButton value="Reporte en PDF" url={report_all.url()}/>
                    </div>
                    <div className='p-2'>
                        <ExcelButton value="Exportar Datos en Excel" url={exportexcel.url()}/>
                    </div>
                </div>
                {products_type.data.length > 0 && (
                    <Table>
                        <TableCaption>Lista de Tipos de Productos</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products_type.data.map((product_type) => (
                                <TableRow key={product_type.id}>
                                    <TableCell className="font-medium">{product_type.id}</TableCell>
                                    <TableCell>{product_type.name}</TableCell>
                                    <TableCell>{product_type.description}</TableCell>

                                    <TableCell className="text-right space-x-2">
                                        <Link  href={show.url(product_type.id)}>
                                            <Button className='bg-slate-500 hover:bg-slate-700'>Ver</Button>
                                        </Link>
                                        <Link href={edit.url(product_type.id)}>
                                            <Button className='bg-slate-500 hover:bg-slate-700'>Editar</Button>
                                        </Link>
                                        <Button
                                            disabled={processing}
                                            className='bg-red-500 hover:bg-red-700'
                                            onClick={() => handleDelete(product_type.id)}
                                            >Eliminar
                                        </Button>
                                        <PdfButton
                                            value=""
                                            url={report.url(product_type.id)}
                                        />
                                        {/* <PdfButton value="" url={route('products.report',product.id)}/> */} {/* me da error el route :C */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                <div className='my-2'>
                    <Pagination links={products_type.links} />
                </div>
            </div>
        </AppLayout>
    );
}

