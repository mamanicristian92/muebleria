<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PageController;

/* Route::get('/', function () {
    return Inertia::render('main/home');
})->name('home'); */

Route::get('/', [PageController::class,'index'])->name('home');
/* Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home'); */

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    //products CRUD
    Route::get('products', [ProductController::class,'index'])->name('products.index');
    Route::get('products/create', [ProductController::class,'create'])->name('products.create');
    Route::post('products', [ProductController::class,'store'])->name('products.store');
    Route::get('products/show/{product}', [ProductController::class,'show'])->name('products.show');
    Route::get('products/edit/{product}', [ProductController::class,'edit'])->name('products.edit');
    Route::put('products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('products/{product}', [ProductController::class,'destroy'])->name('products.destroy');

    //productType CRUD
    Route::get('products_type', [ProductTypeController::class,'index'])->name('products_type.index');
    Route::get('products_type/create', [ProductTypeController::class,'create'])->name('products_type.create');
    Route::post('products_type', [ProductTypeController::class,'store'])->name('products_type.store');
    Route::get('products__type/show/{productType}', [ProductTypeController::class,'show'])->name('products_type.show');
    Route::get('products_type/edit/{productType}', [ProductTypeController::class,'edit'])->name('products_type.edit');
    Route::put('products_type/{productType}', [ProductTypeController::class, 'update'])->name('products_type.update');
    Route::delete('products_type/{productType}', [ProductTypeController::class,'destroy'])->name('products_type.destroy');
    
    //photos
    Route::delete('photos/{photo}', [PhotoController::class,'destroy'])->name('photos.destroy');

    //Excel
    Route::get('products/export', [ProductController::class, 'export'])->name('products.exportexcel');
    //PDFs
    Route::get('products/report', [ProductController::class,'generateReport'])->name('products.report_all');
    Route::get('products/report/{id}', [ProductController::class,'generateReport'])->name('products.report');

    //Permisions routes
    Route::get('permissions', [PermissionController::class, 'index'])->name('permissions.index');
    Route::post('permissions', [PermissionController::class, 'store'])->name('permissions.store');
    Route::put('permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
    Route::delete('permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');

    //Roles routes
    Route::get('roles', [RoleController::class, 'index'])->name('roles.index');
    Route::get('roles/create', [RoleController::class, 'create'])->name('roles.create');
    Route::post('roles', [RoleController::class, 'store'])->name('roles.store');
    Route::get('roles/{role}/edit', [RoleController::class, 'edit'])->name('roles.edit');
    Route::put('roles/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');

    //users
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('users', [UserController::class, 'store'])->name('users.store');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

