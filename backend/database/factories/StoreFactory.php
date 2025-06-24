<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Store>
 */
class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $user = User::where('role', 'seller')->inRandomOrder()->first();
        
        return [
            'seller_id' => $user->id,  
            'store_name' => $this->faker->company(), 
            'store_description' => $this->faker->sentence(), 
            'store_image' => $this->faker->imageUrl(),
            'store_status' => $this->faker->randomElement(['published', 'hidden']),  
        ];
    }
}
