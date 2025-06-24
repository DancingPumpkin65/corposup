<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductGallery;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProductGalleryController extends Controller
{
    /**
     * List all images for a product.
     */
    public function index($productId)
    {
        $images = ProductGallery::where('product_id', $productId)->get();
        return response()->json($images);
    }

    /**
     * Show a specific product image.
     */
public function show($productId, $imageId)
{
    $product = Product::findOrFail($productId);
    $image = $product->galleries()->findOrFail($imageId);

    return response()->json($image);
}

    /**
     * Upload a new image for a product (Seller only).
     */
    public function store(Request $request, $productId)
    {
        $product = Product::findOrFail($productId);

        if ($product->seller_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $galleryItems = [];
        foreach ($request->file('images') as $image) {
            $path = $image->store('products/' . $productId, 'public');
            $galleryItem = ProductGallery::create([
                'product_id' => $productId,
                'image_path' => $path,
            ]);
            $galleryItems[] = $galleryItem;
        }

        return response()->json(['message' => 'Images uploaded successfully.', 'data' => $galleryItems], 201);
    }

    /**
     * Delete a product image (Seller only for their products, Admin for any).
     */
public function destroy($productId, $id)
{
    $user = Auth::user();

    // Verify that the user is logged in and has the "seller" role
    if (!$user || $user->role !== 'seller') {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // Check if the image and product exist
    $product = Product::findOrFail($productId);
    $image = ProductGallery::where('product_id', $productId)->findOrFail($id);

    // Verify that the product belongs to the current seller
    if ($product->seller_id !== $user->id) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    // Delete the file from storage
    Storage::disk('public')->delete($image->image_path);

    // Delete the record from the database
    $image->delete();

    return response()->json(['message' => 'Image deleted successfully.']);
}



}
