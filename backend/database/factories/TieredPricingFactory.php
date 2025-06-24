<?php

namespace Database\Factories;

use App\Models\Unit;
use App\Models\TieredPricing;
use App\Models\ProductPricing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TieredPricing>
 */
class TieredPricingFactory extends Factory
{
    protected $model = TieredPricing::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_pricing_id' => ProductPricing::inRandomOrder()->first()->id,
            'minimum_total_order_value' => $this->faker->randomFloat(2, 10, 100),  // Random value between 10 and 100
            'maximum_total_order_value' => $this->faker->randomFloat(2, 100, 200),  // Random value between 100 and 200
            'unit_id' => Unit::inRandomOrder()->first()->id,  // Random unit from Units table
        ];
    }
}
