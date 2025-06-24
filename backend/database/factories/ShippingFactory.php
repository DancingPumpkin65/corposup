<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Shipping;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shipping>
 */
class ShippingFactory extends Factory
{

     protected $model = Shipping::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'shipping_name' => $this->faker->company(),
            'shipping_description' => $this->faker->sentence(),
            'shipping_cost' => $this->faker->randomFloat(2, 5, 100),
            'shipping_delivery_time' => $this->faker->randomElement(['1 day', '3 days', '5 days', '7 days']),
            'seller_id' => User::where('role', 'seller')->inRandomOrder()->first()->id,
        ];
    }
}
