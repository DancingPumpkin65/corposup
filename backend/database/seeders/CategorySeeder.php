<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Creating parent categories with child categories.
        Category::factory(5)->create()->each(function ($category) {
            // Creating some child categories for each parent category.
            Category::factory(3)->create([
                'category_parent_id' => $category->id,
            ]);
        });
    }
}
