<?php

namespace App\Http\Controllers;

use App\Models\ProductDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductDetailController extends Controller
{
    /**
     * List all product details for a product.
     */
    public function index($productId)
    {
        $details = ProductDetail::where('product_id', $productId)->get();
        return response()->json($details);
    }

    /**
     * Show a specific product detail.
     */
    public function show($id)
    {
        $detail = ProductDetail::findOrFail($id);
        return response()->json($detail);
    }

    /**
     * Create a product detail (Seller only).
     */
    public function store(Request $request, $productId)
    {
        // $this->authorize('create', ProductDetail::class);

        $validated = $request->validate([
            'color' => 'nullable|string|max:255',
            'material' => 'nullable|string|max:255',
            'brand' => 'nullable|string|max:255',
            'GTIN' => 'nullable|string|max:255',
            'MPN' => 'nullable|string|max:255',
        ]);

        $validated['product_id'] = $productId;

        $detail = ProductDetail::create($validated);

        return response()->json(['message' => 'Product detail created successfully.', 'data' => $detail], 201);
    }

    /**
     * Update a product detail (Seller only for their products, Admin for any).
     */
    public function update(Request $request, $id)
    {
        $detail = ProductDetail::findOrFail($id);

        // Only the owner of the product can update details
        if (Auth::user()->role !== 'admin' && $detail->product->seller_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'color' => 'nullable|string|max:255',
            'material' => 'nullable|string|max:255',
            'brand' => 'nullable|string|max:255',
            'GTIN' => 'nullable|string|max:255',
            'MPN' => 'nullable|string|max:255',
        ]);

        $detail->update($validated);

        return response()->json(['message' => 'Product detail updated successfully.', 'data' => $detail]);
    }

    /**
     * Delete a product detail (Seller only for their products, Admin for any).
     */
    public function destroy($id)
    {
        $detail = ProductDetail::findOrFail($id);

        // Only the owner of the product can delete details
        if (Auth::user()->role !== 'admin' && $detail->product->seller_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $detail->delete();

        return response()->json(['message' => 'Product detail deleted successfully.']);
    }
}
