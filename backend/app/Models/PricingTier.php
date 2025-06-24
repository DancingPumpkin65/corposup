<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PricingTier extends Model
{
    use HasFactory;
    protected $fillable = [
        'tiered_pricing_id',
        'minimum_order',
        'maximum_order',
        'price'
    ];

    public function tieredPricing()
    {
        return $this->belongsTo(TieredPricing::class);
    }
}
