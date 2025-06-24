<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * List all reviews for a product.
     */
    public function index($productId)
    {
        $reviews = Review::where('product_id', $productId)->get();
        return response()->json($reviews);
    }

    /**
     * Show a specific review.
     */
public function show($productId, $reviewId)
{
    $product = Product::with(['reviews'])->findOrFail($productId);

    $review = $product->reviews()->find($reviewId);

    if (!$review) {
        return response()->json([
            'message' => 'Review not found',
        ], 404);
    }

    return response()->json($review, 200);
}


    /**
     * Create a review (buyer only).
     */
    public function store(Request $request, $productId)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $validated['product_id'] = $productId;
        $validated['buyer_id'] = Auth::id();

        $review = Review::create($validated);

        return response()->json(['message' => 'Review created successfully.', 'data' => $review], 201);
    }

    /**
     * Update a review (buyer only).
     */
    public function update(Request $request, $productId, $id)
    {
        // Fetch the review by its ID
        $review = Review::findOrFail($id);

        // Verify that the owner is the one performing the edit
        if ($review->buyer_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Verify that the review belongs to the correct product
        if ($review->product_id != $productId) {
            return response()->json(['message' => 'Review does not belong to this product'], 400);
        }

        // Validate the data
        $validated = $request->validate([
            'rating' => 'sometimes|required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        // Update the review
        $review->update($validated);

        return response()->json(['message' => 'Review updated successfully.', 'data' => $review]);
    }

    /**
     * Delete a review (buyer only).
     */
// Delete the rating by the buyer
public function destroyByBuyer($productId, $reviewId)
{
    $review = Review::where('product_id', $productId)->where('id', $reviewId)->first();

    // Check if the rating exists
    if (!$review) {
        return response()->json(['message' => 'Review not found'], 404);
    }

    // Verify that the buyer is the owner of the rating
    if ($review->buyer_id !== Auth::id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $review->delete();

    return response()->json(['message' => 'Review deleted successfully by buyer.']);
}

// Delete the rating by the admin
public function destroyByAdmin($productId, $reviewId)
{
    $this->authorizeAdmin();

    $review = Review::where('product_id', $productId)->where('id', $reviewId)->first();

    // Check if the rating exists
    if (!$review) {
        return response()->json(['message' => 'Review not found'], 404);
    }

    $review->delete();

    return response()->json(['message' => 'Review deleted successfully by admin.']);
}

// Small function to verify admin authorization
private function authorizeAdmin()
{
    if (Auth::user()->role !== 'admin') {
        abort(403, 'Unauthorized');
    }
}



}
