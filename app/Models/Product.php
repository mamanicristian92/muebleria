<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable= [
        'name',
        'description',
        'price',
        'stock',
        'product_type_id',
    ];

    public function type(): BelongsTo
    {
        return $this->belongsTo(ProductType::class, 'product_type_id');
    }
    public function photos()
    {
        return $this->belongsToMany(Photo::class, 'photo_product', 'product_id', 'photo_id');
    }
    public function categories()
    {
        return $this->belongsToMany(Category::class, "category_product", "product_id", "category_id");
    }
}
