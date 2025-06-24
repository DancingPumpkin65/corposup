<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DiscountController extends Controller
{
    /**
     * List all discounts (Admin only).
     */
    public function index()
    {
        // $this->authorize('viewAny', Discount::class);
        $discounts = Discount::with(['product'])->get();
        return response()->json($discounts);
    }

    /**
     * Show a specific discount.
     */
    public function show($id)
    {
        $discount = Discount::with(['product'])->findOrFail($id);
        return response()->json($discount);
    }

    /**
     * Create a discount (Seller only).
     */
public function store(Request $request, $productId)
{
    $validated = $request->validate([
        'discount_value' => 'required|numeric|min:0|max:100',
        'discount_start' => 'required|date',
        'discount_end' => 'required|date|after:discount_start',
        'discount_active' => 'required|boolean',
    ]);

    $product = Product::findOrFail($productId);

    // Ensure that the seller is the owner of the product
    if ($product->seller_id !== Auth::id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $product_price = $product->product_price;
    $discount_value = $validated['discount_value'];
    $discount_amount = ($product_price * $discount_value) / 100;
    $new_price = $product_price - $discount_amount;

    // Store the discount in the database
    $discountData = array_merge($validated, [
        'seller_id' => Auth::id(),
        'product_id' => $productId,
        'discount_amount' => $discount_amount,
        'new_price' => $new_price,
    ]);

    $discount = Discount::create($discountData);

    return response()->json([
        'message' => 'Discount created successfully.',
        'data' => $discount,
        'original_price' => $product_price,
        'discount_value' => $discount_value,
        'discount_amount' => $discount_amount,
        'new_price' => $new_price,
    ], 201);
}




    /**
     * Update a discount (Seller only for their products, Admin for any).
     */
public function update(Request $request, $id)
{
    $discount = Discount::findOrFail($id);

    if (Auth::user()->role !== 'admin' && $discount->seller_id !== Auth::id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $validated = $request->validate([
        'discount_value' => 'sometimes|required|numeric|min:0|max:100',
        'discount_start' => 'sometimes|required|date',
        'discount_end' => 'sometimes|required|date|after:discount_start',
        'discount_active' => 'sometimes|required|boolean',
    ]);

    // If the discount percentage is modified
    if (isset($validated['discount_value'])) {
        $product = $discount->product;
        $product_price = $product->product_price;
        $discount_value = $validated['discount_value'];
        $discount_amount = ($product_price * $discount_value) / 100;
        $new_price = $product_price - $discount_amount;

        // Update the values in the validated data
        $validated['discount_amount'] = $discount_amount;
        $validated['new_price'] = $new_price;
    }

    $discount->update($validated);

    return response()->json([
        'message' => 'Discount updated successfully.',
        'data' => $discount,
        'original_price' => $product_price,
        'discount_value' => $discount_value,
        'discount_amount' => $discount_amount,
        'new_price' => $new_price,
    ]);
}


    // Toggle Discount Status (for sellers only)
    public function toggleStatus($productId, $discountId)
    {
        $discount = Discount::where('id', $discountId)
            ->where('product_id', $productId)
            ->where('seller_id', Auth::id())
            ->first();

        if (!$discount) {
            return response()->json(['message' => 'Discount not found or you do not have permission to update the status.'], 404);
        }

        $discount->discount_active = !$discount->discount_active;
        $discount->save();

        return response()->json([
            'message' => 'Discount status toggled successfully.',
            'data' => $discount
        ]);
    }

    /**
     * Delete a discount (Admin only).
     */
    public function destroy($productId, $discountId)
    {
        // Check if the product exists
        $product = Product::find($productId);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Check if the discount exists
        $discount = $product->discount()->find($discountId);

        if (!$discount) {
            return response()->json(['message' => 'Discount not found for this product'], 404);
        }

        // Delete the discount
        $discount->delete();

        return response()->json(['message' => 'Discount deleted successfully']);
    }
}
