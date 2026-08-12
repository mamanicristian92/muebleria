import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Product, Url } from '@/types';
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
import { index, create, show, edit, destroy as deleteProduct } from '@/actions/App/Http/Controllers/ProductController'; //wayfinder
import {report_all, report, exportexcel } from "@/routes/products"; //routes(?)

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: index.url(),
    },
];

interface ProductsPaginated {
    data: Product[];
    links: Url[];
}

export default function Index({products}: {products: ProductsPaginated}) {
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
                                Create Product
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
                {products.data.length > 0 && (
                    <Table>
                        <TableCaption>Lista de Prodcutos</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Precio</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Fotos</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.data.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{Intl.NumberFormat('en-us', {minimumFractionDigits: 2}).format(product.price)}</TableCell>
                                    <TableCell>{product.type.name}</TableCell>
                                    <TableCell>{product.photos.length}</TableCell>

                                    <TableCell className="text-right space-x-2">
                                        <Link  href={show.url(product.id)}>
                                            <Button className='bg-slate-500 hover:bg-slate-700'>Ver</Button>
                                        </Link>
                                        <Link href={edit.url(product.id)}>
                                            <Button className='bg-slate-500 hover:bg-slate-700'>Editar</Button>
                                        </Link>
                                        <Button
                                            disabled={processing}
                                            className='bg-red-500 hover:bg-red-700'
                                            onClick={() => handleDelete(product.id)}
                                            >Eliminar
                                        </Button>
                                        <PdfButton
                                            value=""
                                            url={report.url(product.id)}
                                        />
                                        {/* <PdfButton value="" url={route('products.report',product.id)}/> */} {/* me da error el route :C */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                <div className='my-2'>
                    <Pagination links={products.links} />
                </div>
            </div>
        </AppLayout>
    );
}

