<?php

namespace Database\Factories;

use App\Models\PricingTier;
use App\Models\TieredPricing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PricingTier>
 */
class PricingTierFactory extends Factory
{
    protected $model = PricingTier::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tiered_pricing_id' => TieredPricing::inRandomOrder()->first()->id,  // Random TieredPricing ID
            'minimum_order' => $this->faker->numberBetween(1, 10),  // Random number between 1 and 10
            'maximum_order' => $this->faker->optional()->numberBetween(10, 100),  // Optional random number between 10 and 100
            'price' => $this->faker->randomFloat(2, 10, 100),  // Random price between 10 and 100
        ];
    }
}
