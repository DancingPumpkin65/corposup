<?php

namespace Database\Factories;

use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unit>
 */
class UnitFactory extends Factory
{

    protected $model = Unit::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'unit_name' => $this->faker->randomElement(['Kilogram', 'Gram', 'Liter', 'Piece', 'Pack', 'Box', 'Percentage']),
            'unit_code' => $this->faker->unique()->randomElement(['kg', 'g', 'L', 'pcs', 'pk', 'bx', '%']),
        ];
    }
}
