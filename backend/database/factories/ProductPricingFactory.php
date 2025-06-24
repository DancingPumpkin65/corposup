<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductPricing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductPricing>
 */
class ProductPricingFactory extends Factory
{

    protected $model = ProductPricing::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::inRandomOrder()->first()->id,
            'sale_type' => $this->faker->randomElement(['quantity', 'unit', 'negotiable']),
        ];
    }
}
