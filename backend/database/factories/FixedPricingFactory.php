<?php

namespace Database\Factories;

use App\Models\Unit;
use App\Models\FixedPricing;
use App\Models\ProductPricing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FixedPricing>
 */
class FixedPricingFactory extends Factory
{
    protected $model = FixedPricing::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_pricing_id' => ProductPricing::inRandomOrder()->first()->id,
            'unit_id' => Unit::inRandomOrder()->first()->id,
            'price' => $this->faker->randomFloat(2, 5, 100),  // Random price between 5 and 100
        ];
    }
}
