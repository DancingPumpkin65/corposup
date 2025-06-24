<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductDetailFactory extends Factory
{
    protected $model = ProductDetail::class;

    public function definition(): array
    {
        return [
            'product_id' => Product::inRandomOrder()->first()->id,
            'color' => $this->faker->safeColorName(),
            'material' => $this->faker->randomElement(['Cotton', 'Plastic', 'Metal', 'Leather', 'Wood', 'Glass']),
            'brand' => $this->faker->company(),
            'GTIN' => $this->faker->unique()->ean13(),
            'MPN' => $this->faker->unique()->regexify('[A-Z0-9]{8}'),
        ];
    }
}
