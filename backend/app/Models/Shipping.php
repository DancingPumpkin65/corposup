<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    protected $fillable = [
        'shipping_name',
        'shipping_description',
        'shipping_cost',
        'shipping_delivery_time',
        'seller_id',
    ];

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function products()
{
    return $this->belongsToMany(Product::class, 'product_shipping');
}

}
