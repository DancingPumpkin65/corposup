<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductPricing extends Model
{
    use HasFactory;
        protected $fillable = [
        'product_id',
        'sale_type'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function fixedPricings()
    {
        return $this->hasMany(FixedPricing::class);
    }

    public function negotiablePricing()
    {
        return $this->hasOne(NegotiablePricing::class);
    }

    public function tieredPricings()
    {
        return $this->hasMany(TieredPricing::class);
    }
}
