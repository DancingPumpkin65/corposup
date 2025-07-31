<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{

    use HasFactory;
    protected $fillable = ['category_name', 'category_parent_id'];

    // The relationship with the parent category.
    public function parent()
    {
        return $this->belongsTo(Category::class, 'category_parent_id');
    }

    // The relationship with the child categories.
    public function children()
    {
        return $this->hasMany(Category::class, 'category_parent_id')->with('children');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
