<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * List all products (Admin) or only the seller's products (Seller).
     */
public function index()
{
    $this->authorizeAdmin();

    $products = Product::with(['store', 'category', 'reviews', 'discount', 'shippings'])->get();

    return response()->json($products);
}


    public function myProducts()
    {
        $this->authorizeSeller();

        $products = Product::where('seller_id', Auth::id())
            ->with(['store', 'category', 'reviews', 'discount', 'shippings'])
            ->get();

        return response()->json($products);
    }

        private function authorizeAdmin()
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            abort(403, 'Unauthorized');
        }
    }

    private function authorizeSeller()
    {
        if (!Auth::check() || Auth::user()->role !== 'seller') {
            abort(403, 'Unauthorized');
        }
    }




    /**
     * List all public products (any user can access).
     */
    public function showPublicProduct()
    {
        $products = Product::with(['store', 'category', 'reviews', 'discount', 'shippings', 'galleries', 'details'])->get();
        return response()->json($products);
    }

    /**
     * Show product details (Admin and Seller).
     */
public function show($id)
{
    $product = Product::with(['store', 'category', 'reviews', 'discount', 'shippings', 'galleries', 'details'])
        ->findOrFail($id);

    return response()->json($product);
}


        /**
     * List products by category.
     */
    public function productsByCategory($categoryId)
    {
        $products = Product::where('category_id', $categoryId)
            ->with(['store', 'category', 'reviews', 'discount', 'shippings', 'galleries', 'details'])
            ->get();
        return response()->json($products);
    }

    /**
     * List products by store.
     */
    public function productsByStore($storeId)
    {
        $products = Product::where('store_id', $storeId)
            ->with(['store', 'category', 'reviews', 'discount', 'shippings', 'galleries', 'details'])
            ->get();
        return response()->json($products);
    }

    /**
     * Create a new product (Seller only).
     */
// ProductController.php

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string|max:255',
            'product_ref' => 'required|string|max:255|unique:products',
            'product_description' => 'nullable|string',
            'product_price' => 'required|numeric|min:0',
            'product_stock' => 'required|integer|min:0',
            'product_minimum_commande' => 'required|integer|min:1',
            'category_id' => 'required|exists:categories,id',
            'store_id' => 'required|exists:stores,id',
            'unit_id' => 'required|exists:units,id',
            'shipping_ids' => 'nullable|array',
            'shipping_ids.*' => 'exists:shippings,id',
            'key_words' => 'nullable|array|max:4',
            'key_words.*' => 'string|max:50',
        ]);

        $validated['seller_id'] = Auth::id();

        // إنشاء المنتج
        $product = Product::create($validated);

        // ربط الشحنات (إن وُجدت)
        if (!empty($validated['shipping_ids'])) {
            $product->shippings()->sync($validated['shipping_ids']);
        }

        return response()->json(['message' => 'Product created successfully.', 'data' => $product->load('shippings')], 201);
    }
    /**
     * Update a product (Admin can update any, Seller only theirs).
     */
    public function updateByAdmin(Request $request, $id)
    {
        $this->authorizeAdmin();

        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'product_name' => 'sometimes|required|string|max:255',
            'product_description' => 'nullable|string',
            'product_price' => 'sometimes|required|numeric|min:0',
            'product_stock' => 'sometimes|required|integer|min:0',
            'product_minimum_commande' => 'sometimes|required|integer|min:1',
            'category_id' => 'sometimes|required|exists:categories,id',
            'store_id' => 'sometimes|required|exists:stores,id',
            'shipping_ids' => 'nullable|array',
            'shipping_ids.*' => 'exists:shippings,id',
        ]);

        $product->update($validated);

        if (isset($validated['shipping_ids'])) {
            $product->shippings()->sync($validated['shipping_ids']);
        }

        return response()->json(['message' => 'Product updated successfully.', 'data' => $product->load('shippings')]);
    }

public function updateBySeller(Request $request, $id)
{
    $this->authorizeSeller();

    // Verify ownership before fetching product
    $product = Product::findOrFail($id);

    if ($product->seller_id !== Auth::id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $validated = $request->validate([
        'product_name' => 'sometimes|required|string|max:255',
        'product_description' => 'nullable|string',
        'product_price' => 'sometimes|required|numeric|min:0',
        'product_stock' => 'sometimes|required|integer|min:0',
        'product_minimum_commande' => 'sometimes|required|integer|min:1',
        'category_id' => 'sometimes|required|exists:categories,id',
        'store_id' => 'sometimes|required|exists:stores,id',
        'shipping_ids' => 'nullable|array',
        'shipping_ids.*' => 'exists:shippings,id',
    ]);

    $product->update($validated);

    if (isset($validated['shipping_ids'])) {
        $product->shippings()->sync($validated['shipping_ids']);
    }

    return response()->json(['message' => 'Product updated successfully.', 'data' => $product->load('shippings')]);
}
    





    // Update product status (Seller only)
    public function updateStatus(Request $request, $id)
    {
        $product = Product::where('id', $id)
            ->where('seller_id', Auth::id())
            ->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found or you do not have permission to update the status.'], 404);
        }

        $validated = $request->validate([
            'product_status' => 'required|in:published,hidden'
        ]);

        $product->update($validated);

        return response()->json([
            'message' => 'Product status updated successfully.',
            'data' => $product
        ]);
    }

    /**
     * Delete a product (Admin only).
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Only admin can delete products
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully.']);
    }
}
