<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    //
    protected $fillable = [
        'url',
        'description',
    ];
    
    public function products()
    {
        return $this->belongsToMany(Product::class, 'photo_product', 'photo_id', 'product_id');
    }
    
}
