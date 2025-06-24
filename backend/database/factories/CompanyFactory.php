<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $user = User::where('role', 'seller')->inRandomOrder()->first();

        if (!$user) {
            $user = User::factory()->seller()->create();
        }

        return [
            'user_id' => $user->id,
            'company_name' => fake()->company(),
            'company_phone' => fake()->phoneNumber(),
            'sector' => fake()->word(),
            'ice_number' => fake()->randomNumber(9, true),
            'legal_form' => fake()->randomElement(['SARL', 'SA', 'SAS', 'SNC']),
            'website' => fake()->url(),
            'address1' => fake()->streetAddress(),
            'address2' => fake()->secondaryAddress(),
            'city' => fake()->city(),
            'country' => fake()->country(),
        ];
    }
}
