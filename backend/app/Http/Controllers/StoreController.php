<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoreController extends Controller
{
    // list of all stores (admin)
    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $stores = Store::all();
        return response()->json($stores);
    }

    // show stor of seller
    public function show()
    {
        $store = Store::where('seller_id', Auth::id())->get();

        if (!$store) {
            return response()->json(['message' => 'No store found.'], 404);
        }

        return response()->json($store);
    }

    // create new store
    public function store(Request $request)
    {
        $validated = $request->validate([
            'store_name' => 'required|string|max:255',
            'store_description' => 'nullable|string',
            'store_image' => 'nullable|image|max:2048',
            'store_status' => 'required|in:published,hidden',
        ]);

        if ($request->hasFile('store_image')) {
            $filename = $request->file('store_image')->store('stores', 'public');
            $validated['store_image'] = $filename;
        }

        $validated['seller_id'] = Auth::id();

        $store = Store::create($validated);

        return response()->json([
            'message' => 'Store created successfully.',
            'store' => $store,
        ], 201);

    }


    // update store
    public function update(Request $request, $id)
    {
        $store = Store::where('seller_id', Auth::id())->findOrFail($id);

        $validated = $request->validate([
            'store_name' => 'sometimes|required|string|max:255',
            'store_description' => 'nullable|string',
            'store_image' => 'nullable|image|max:2048',
            'store_status' => 'nullable|in:published,hidden',
        ]);

        if ($request->hasFile('store_image')) {
            $filename = $request->file('store_image')->store('stores', 'public');
            $validated['store_image'] = $filename;
        }

        $store->update($validated);

        return response()->json([
            'message' => 'Store updated successfully.',
            'store' => $store,
        ]);
    }

    // delete store
    public function destroy($id)
    {
        $store = Store::where('seller_id', Auth::id())->findOrFail($id);
        $store->delete();

        return response()->json(['message' => 'Store deleted successfully.']);
    }

    // Public: list all stores (for frontend select)
    public function publicIndex()
    {
        $stores = Store::all(['id', 'store_name', 'store_status']);
        return response()->json($stores);
    }
}