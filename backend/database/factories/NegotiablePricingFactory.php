<?php

namespace Database\Factories;

use App\Models\ProductPricing;
use App\Models\NegotiablePricing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NegotiablePricing>
 */
class NegotiablePricingFactory extends Factory
{
    protected $model = NegotiablePricing::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_pricing_id' => ProductPricing::inRandomOrder()->first()->id,
            'minimum_price' => $this->faker->randomFloat(2, 5, 50),  // Random minimum price between 5 and 50
        ];
    }
}
