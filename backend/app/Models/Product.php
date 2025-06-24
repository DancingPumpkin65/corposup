<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
        use HasFactory;   
        protected $fillable = [
        'seller_id',
        'store_id',
        'product_name',
        'product_ref',
        'product_description',
        'product_price',
        'product_stock',
        'producut_minimum_Commande',
        'category_id',
        'product_status',
        'video_path',
        'video_discription',
        'unit_id',
        // 'shipping_id',
        'key_words',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function details()
    {
        return $this->hasOne(ProductDetail::class);
    }

    public function galleries()
    {
        return $this->hasMany(ProductGallery::class, 'product_id');
    }


    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function discount()
    {
        return $this->hasOne(Discount::class, 'product_id', 'id');
    }
public function shippings()
{
    return $this->belongsToMany(Shipping::class, 'product_shipping')->withTimestamps();
}



    public function pricing()
    {
        return $this->hasOne(ProductPricing::class);
    }
        public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    // Relationship with the unit
    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }


    // Convert keywords from JSON to array and vice versa
    protected $casts = [
        'key_words' => 'array',
    ];
}
