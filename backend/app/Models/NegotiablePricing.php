<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class NegotiablePricing extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_pricing_id',
        'minimum_price'
    ];

    public function pricing()
    {
        return $this->belongsTo(ProductPricing::class);
    }
}
