<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Product;
use App\Models\Discount;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Discount>
 */
class DiscountFactory extends Factory
{
    protected $model = Discount::class;

    public function definition(): array
    {
        $product = Product::with('store')->inRandomOrder()->first();

        // Ensure that the product and its store exist
        if (!$product || !$product->store) {
            throw new \Exception("No valid product with store available for seeding discounts.");
        }

        // Get the seller from the associated store
        $seller = $product->store->seller;

        // Ensure that the seller exists
        if (!$seller) {
            throw new \Exception("No seller found for the selected product.");
        }

        // Calculate the discount and the new price
        $discount_value = $this->faker->numberBetween(5, 50);
        $discount_amount = $product->product_price * ($discount_value / 100);
        $new_price = $product->product_price - $discount_amount;

        return [
            'seller_id' => $seller->id,
            'product_id' => $product->id,
            'discount_value' => $discount_value,
            'discount_amount' => round($discount_amount, 2),
            'new_price' => round($new_price, 2),
            'discount_start' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'discount_end' => $this->faker->dateTimeBetween('now', '+1 month'),
            'discount_active' => $this->faker->boolean(),
        ];
    }
}
