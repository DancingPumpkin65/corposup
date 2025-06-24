<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductShipping extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_id',
        'shipping_id'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function shipping()
    {
        return $this->belongsTo(Shipping::class);
    }
}
