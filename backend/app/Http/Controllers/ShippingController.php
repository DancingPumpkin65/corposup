<?php

namespace App\Http\Controllers;

use App\Models\Shipping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShippingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->role === 'seller') {
            $shippings = Shipping::where('seller_id', Auth::id())->get();
        } else {
            $shippings = Shipping::all();
        }

        return response()->json($shippings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shipping_name' => 'required|string|max:255',
            'shipping_description' => 'nullable|string',
            'shipping_cost' => 'required|numeric|min:0',
            'shipping_delivery_time' => 'required|string|max:255',
        ]);

        if (Auth::user()->role === 'admin') {
            if (!$request->has('seller_id')) {
                return response()->json(['message' => 'Seller ID is required for admin.'], 400);
            }
            $validated['seller_id'] = $request->seller_id;
        } else {
            $validated['seller_id'] = Auth::id();
        }

        $shipping = Shipping::create($validated);

        return response()->json([
            'message' => 'Shipping service created successfully.',
            'data' => $shipping
        ], 201);
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        if (Auth::user()->role === 'admin') {
            $shipping = Shipping::find($id);
        } else {
            $shipping = Shipping::where('id', $id)->where('seller_id', Auth::id())->first();
        }

        if (!$shipping) {
            return response()->json(['message' => 'Shipping not found.'], 404);
        }

        return response()->json($shipping);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        if (Auth::user()->role === 'admin') {
            $shipping = Shipping::find($id);
        } else {
            $shipping = Shipping::where('id', $id)->where('seller_id', Auth::id())->first();
        }

        if (!$shipping) {
            return response()->json(['message' => 'Shipping not found.'], 404);
        }

        $validated = $request->validate([
            'shipping_name' => 'sometimes|required|string|max:255',
            'shipping_description' => 'nullable|string',
            'shipping_cost' => 'sometimes|required|numeric|min:0',
            'shipping_delivery_time' => 'sometimes|required|string|max:255',
        ]);

        $shipping->update($validated);

        return response()->json([
            'message' => 'Shipping service updated successfully.',
            'data' => $shipping
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if (Auth::user()->role === 'admin') {
            $shipping = Shipping::find($id);
        } else {
            $shipping = Shipping::where('id', $id)->where('seller_id', Auth::id())->first();
        }

        if (!$shipping) {
            return response()->json(['message' => 'Shipping not found.'], 404);
        }

        $shipping->delete();

        return response()->json(['message' => 'Shipping service deleted successfully.']);
    }
}
