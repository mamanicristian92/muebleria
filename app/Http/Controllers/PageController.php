<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Log;

class PageController extends Controller
{
    //
    public function index()
    {
        //
        Log::channel("test")->info("index");
        $products=Product::with("photos:id,url")->paginate(12);
        Log::channel("test")->info($products);
        return Inertia::render('main/home', [
            'productsPaginated' => $products,
        ]);
    }
}
