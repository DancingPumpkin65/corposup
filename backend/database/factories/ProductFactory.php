<?php

namespace Database\Factories;

use App\Models\Unit;
use App\Models\User;
use App\Models\Store;
use App\Models\Product;
use App\Models\Category;
// use App\Models\Shipping;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $seller = User::where('role', 'seller')->inRandomOrder()->first();
        $store = Store::inRandomOrder()->first();
        $category = Category::inRandomOrder()->first();
        $unit = Unit::inRandomOrder()->first();
        // $shipping = Shipping::inRandomOrder()->first();

        return [
            'seller_id' => $seller ? $seller->id : User::factory()->create(['role' => 'seller'])->id,
            'store_id' => $store ? $store->id : Store::factory()->create()->id,
            'category_id' => $category ? $category->id : Category::factory()->create()->id,
            'unit_id' => $unit ? $unit->id : Unit::factory()->create()->id,
            // 'shipping_id' => $shipping ? $shipping->id : Shipping::factory()->create()->id,
            'product_name' => $this->faker->word(),
            'product_ref' => $this->faker->unique()->bothify('PROD-####'),
            'product_description' => $this->faker->sentence(),
            'product_price' => $this->faker->randomFloat(2, 10, 1000),
            'product_stock' => $this->faker->numberBetween(1, 100),
            'product_minimum_commande' => $this->faker->numberBetween(1, 5),
            'key_words' => $this->faker->words(4),
            'product_status' => $this->faker->randomElement(['published', 'hidden']),
            'video_path' => $this->faker->url(),
            'video_description' => $this->faker->sentence(),
        ];
    }
}
