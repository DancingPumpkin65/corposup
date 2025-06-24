<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Store;
use App\Models\Company;
use App\Models\Shipping;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use App\Models\Discount;
use App\Models\Unit;
use App\Models\ProductGallery;
use App\Models\ProductDetail;
use App\Models\ProductPricing;
use App\Models\FixedPricing;
use App\Models\NegotiablePricing;
use App\Models\TieredPricing;
use App\Models\PricingTier;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
{
    // create 5 users (buyers)
    User::factory(5)->buyer()->create();

    // create 5 users (sellers) with companies and stores
    User::factory(5)->seller()->create()->each(function ($user) {
        Company::factory()->create([
            'user_id' => $user->id,
        ]);

        Store::factory()->create([
            'seller_id' => $user->id,
        ]);
    });

    // create admin
    User::factory()->create([
        'firstname' => 'admin',
        'lastname' => 'admin',
        'email' => 'admin@gmail.com',
        'password' => Hash::make('admin1234'),
        'role' => 'admin',
    ]);

    $this->call(CategorySeeder::class);

    // Generate 10 shippings
    Shipping::factory(10)->create();

    // Generate 5 units
    Unit::factory(5)->create();

    // Generate 5 categories (assuming you have CategorySeeder)
    $this->call(CategorySeeder::class);

    // Generate 10 products for sellers
    Product::factory(10)->create()->each(function ($product) {
        // Associate with category
        $product->category_id = Category::inRandomOrder()->first()->id;
        $product->save();

        // Associate with shipping (shipping relation)
        $product->shippings()->attach(Shipping::inRandomOrder()->first()->id);

        // Product gallery
        ProductGallery::factory(3)->create([
            'product_id' => $product->id,
        ]);

        // Product details
        ProductDetail::factory()->create([
            'product_id' => $product->id,
        ]);

        // Product pricing
        ProductPricing::factory()->create([
            'product_id' => $product->id,
        ]);

        // Ensure product has a seller, if not, assign a default one
        $seller = User::where('role', 'seller')->inRandomOrder()->first();

        // If no seller exists, create a default one
        if (!$seller) {
            $seller = User::factory()->create(['role' => 'seller']);
        }

        // Discount
        Discount::factory()->create([
            'product_id' => $product->id,
            'seller_id' => $seller->id,
        ]);
    });

    // Generate 5 reviews for products
    Review::factory(5)->create();

    // Generate pricing models (Fixed, Negotiable, Tiered)
    FixedPricing::factory(5)->create();
    NegotiablePricing::factory(5)->create();
    TieredPricing::factory(5)->create();
    PricingTier::factory(5)->create();
}

}
