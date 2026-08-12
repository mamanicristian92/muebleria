<?php

namespace App\Exports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithColumnWidths;


class ProductsExport implements FromCollection, WithHeadings, WithColumnWidths
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings(): array
    {
        return [
            'ID',
            'name',
            'tipo',
            'description',
            'stock',
            'price',
        ];
    }
    public function columnWidths(): array
    {
        return [
            'A' => 5,
            'B' => 20,
            'C' => 15,
            'D' => 20,
            'E' => 10,
            'F' => 10,
        ];
    }
    public function collection()
    {
        
        return Product::join('product_types','products.product_type_id','=','product_types.id')
                        ->select(
                            'products.id',
                            'products.name',
                            'product_types.name as type_name',
                            'products.description',
                            'products.stock',
                            'products.price',
                        )
                        ->orderBy('products.id','asc')
                        ->get();

    }
}

