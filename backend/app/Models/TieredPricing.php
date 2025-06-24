<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TieredPricing extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_pricing_id',
        'minimum_total_order_value',
        'maximum_total_order_value',
        'unit_id'
    ];

    public function pricing()
    {
        return $this->belongsTo(ProductPricing::class);
    }

    public function tiers()
    {
        return $this->hasMany(PricingTier::class);
    }
}
