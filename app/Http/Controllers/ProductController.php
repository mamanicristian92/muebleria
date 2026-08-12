<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Inertia\Inertia;
use App\Models\ProductType;
use App\Models\Photo;
//reportes y exportación
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ProductsExport;
use Log;
use Illuminate\Support\Facades\Auth;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('products/index', [
            'products' => Product::with(['type:id,name','photos'])->paginate(10),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia('products/create', [
            'products' => new Product(),
            'productTypes' => ProductType::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        //
        //Log::channel('test')->info("StoreProduct called");
        $validated = $request->validated();
        Product::create($validated);
        if ($request->hasFile('images')) {
            $images = $request->file('images');
            foreach ($images as $image) {
                $urlImage = $image->store('images/products', 'public');
                $photo = Photo::create([
                    'url' => $urlImage,
                    'description' => 'Imagen del producto ' . $validated['name'],
                ]);
                $photo->products()->attach(Product::latest()->first()->id);
            }
        }

        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
        $product=$product->load('type', 'photos');
        $product->photos->map(function ($photo, $id){
            $photo->url="storage/".$photo->url;
            return $photo;
        });
        return Inertia::render('products/show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
        $product=$product->load('type', 'photos');
        $product->photos->map(function ($photo, $id){
            $photo->url="storage/".$photo->url;
            return $photo;
        });
        Log::channel("test")->info("product");
        Log::channel("test")->info($product);
        return Inertia::render('products/edit', [
            'product' => $product,
            'productTypes' => ProductType::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        // Actualizamos el producto
        Log::channel('test')->info("UpdateProduct called");
        $validated = $request->validated();
        $product->update($validated);
        // Borramos fotos que eligió el usuario
        if ($request->deleted_photos) {
            $deleting_photos=Photo::whereIn('id', $request->deleted_photos)->pluck("url");
            //Storage::disk('public')->delete($deleting_photos);    //no funciona si le mando un array pero sí funciona si lo mando de a uno
            // Aqui se borran del disco
            foreach ($deleting_photos as $photo_path) {
                if (Storage::disk('public')->exists($photo_path)) {
                    Storage::disk('public')->delete($photo_path);
                }
            }
            Photo::whereIn('id', $request->deleted_photos)->delete();   //Aquí se eliminan de la base de datos
        }
        // Agregamos las fotos nuevas
        foreach ($request->new_photos as $image) {  //agregamos nuevas fotos
            $urlImage = $image->store('images/products', 'public');
            $photo = Photo::create([
                'url' => $urlImage,
                'description' => 'Imagen del producto ' . $validated['name'],
            ]);
            $photo->products()->attach($product->id);   //asociamos foto al producto
        }
        //enviar el mail
        /* $product->update($validated);
        $data = array(
            'name' => Auth::user()->name,
            'email' => Auth::user()->email,
            'producto_nombre' => $product->name,
            'producto_descripcion' => $product->description,
            'producto_stock' => $product->stock,
            'producto_precio' => $product->price
        );
        Mail::to($data['email'])->send(new SendMail($data)); */
        return redirect()->route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }

    public function generateReport($id = null)    //genera  un reporte en PDF
    {
        $product_id = $id;
        $data = [
            //'title' => 'Listado de Productos',
            'date' => date('d/m/Y'),
            //'products' => $products,
        ];

        if ($product_id) {
            $product = Product::find($product_id);
            $data['title'] = 'Producto: ' . $product->name;
            $data['product'] = [$product];
            $pdf = Pdf::loadView('reports/product', ['data' => $data])->setPaper('a4', 'portrait');
            return $pdf->stream('product.pdf');
        }
        //en caso de que no se pase id, se listan todos
        $products = Product::select('id', 'name', 'description', 'price', 'stock')->get();
        $data['title'] = 'Listado de Productos';
        $data['products'] = $products;
        $pdf = Pdf::loadView('reports/products', ['data' => $data])->setPaper('a4', 'portrait');
        return $pdf->stream('products.pdf');
    }

    public function export()    //exporta los datos en un archivo Excel
    {
        Log::channel('test')->info('Something happened!');
        return Excel::download(new ProductsExport, 'products.xlsx');
    }
}
