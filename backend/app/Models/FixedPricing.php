<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FixedPricing extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_pricing_id',
        'unit_id',
        'price'
    ];

    public function pricing()
    {
        return $this->belongsTo(ProductPricing::class);
    }
}
