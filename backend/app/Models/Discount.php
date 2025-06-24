<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Discount extends Model
{
    use HasFactory;
        protected $fillable = [
        'seller_id',
        'product_id',
        'discount_value',
        'discount_start',
        'discount_end',
        'discount_active',
        'discount_amount',  
        'new_price'
    ];

public function product()
{
    return $this->belongsTo(Product::class, 'product_id', 'id');
}

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }
}
