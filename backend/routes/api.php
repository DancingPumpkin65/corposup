<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\ShippingController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\ProductGalleryController;
use App\Http\Controllers\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/test', function(){
    return 'hello';
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Protected routes
    Route::get('/profile', function () {
        return Auth::user();
    });

    // Role-specific routes
    Route::middleware('role:buyer')->group(function () {
        Route::get('/buyer-dashboard', function () {
            return response()->json(['message' => 'Buyer Dashboard']);
        });

    });

    Route::middleware('role:seller')->group(function () {
        Route::get('/seller-dashboard', function () {
            return response()->json(['message' => 'seller Dashboard']);
        });
        Route::post('/complete-company-info', [ProfileController::class, 'completeCompanyInfo']);
        // For sellers (view their own company info)
        Route::get('/my-company', [ProfileController::class, 'showSellerCompany']);

        // store
        Route::get('/my-store', [StoreController::class, 'show']);
        Route::post('/my-store', [StoreController::class, 'store']);
        Route::put('/my-store/{id}', [StoreController::class, 'update']);
        Route::delete('/my-store/{id}', [StoreController::class, 'destroy']);

    });

    Route::middleware('role:admin')->group(function () {
        Route::get('/admin-dashboard', function () {
            return response()->json(['message' => 'Admin Dashboard']);
        });
        
        Route::get('/users/{userId}', [AdminController::class, 'showSellerForAdmin']);
        // list of all stores for admin
        Route::get('/stores', [StoreController::class, 'index']);
        // For admins (view all companies)
        Route::get('/companies', [ProfileController::class, 'listCompanies']);
        Route::get('/companies/{id}', [ProfileController::class, 'showCompany']);
        // categories
        Route::apiResource('/categories', CategoryController::class)->except(['index', 'show']);
    });
    // complete user info
    Route::post('/complete-user-info', [ProfileController::class, 'completeUserInfo']);

    // update profile
    Route::put('/update-profile', [ProfileController::class, 'updateProfile']);
});

// Public endpoints
Route::get('/stores', [StoreController::class, 'publicIndex']);
Route::apiResource('/categories', CategoryController::class)->only(['index', 'show']);
// Add public users endpoint for frontend display
Route::get('/users', [UserController::class, 'index']);


// show shippings for all users


// Admin and Seller can manage shipping services
Route::middleware(['auth:sanctum', 'role:admin,seller'])->group(function () {
    Route::get('/shippings', [ShippingController::class, 'index']);
    Route::get('/shippings/{id}', [ShippingController::class, 'show']);
    Route::post('/shippings', [ShippingController::class, 'store']);
    Route::put('/shippings/{id}', [ShippingController::class, 'update']);
    Route::delete('/shippings/{id}', [ShippingController::class, 'destroy']);
});


// Public Routes for Products (accessible to all users)
Route::get('/all-products', [ProductController::class, 'showPublicProduct']); // done
Route::get('/products/{id}', [ProductController::class, 'show']); // done
Route::get('/products/{product}/reviews', [ReviewController::class, 'index']); // done
Route::get('/products/{product}/reviews/{id}', [ReviewController::class, 'show']); // done
Route::get('/products/{product}/gallery', [ProductGalleryController::class, 'index']); // done
Route::get('/products/{product}/gallery/{id}', [ProductGalleryController::class, 'show']); // done
// get by category
Route::get('/categories/{categoryId}/products', [ProductController::class, 'productsByCategory']); // done
// get by store
Route::get('/stores/{storeId}/products', [ProductController::class, 'productsByStore']); // done

// Seller Routes for product (only accessible to authenticated sellers)
Route::middleware(['auth:sanctum', 'role:seller'])->group(function () {
    // show product of seller auth
    Route::get('/my-products', [ProductController::class, 'myProducts']); // done
    // add new product
    Route::post('/products', [ProductController::class, 'store']); // done
    // update product
    Route::put('/seller/products/{id}', [ProductController::class, 'updateBySeller']); // done
    // update status of product
    Route::patch('/products/{id}/status', [ProductController::class, 'updateStatus']); // done
    // add gallery
    Route::post('/products/{product}/gallery', [ProductGalleryController::class, 'store']); // done
    // delete image from gallery
    Route::delete('/products/{product}/gallery/{id}', [ProductGalleryController::class, 'destroy']); // done
    // add discount
    Route::post('/products/{product}/discounts', [DiscountController::class, 'store']); // done
    // update discount
    Route::put('/products/{product}/discounts/{id}', [DiscountController::class, 'update']); // done
    // change status discount
    Route::patch('/products/{product}/discounts/{id}/toggle', [DiscountController::class, 'toggleStatus']);
    // delete discount
    Route::delete('/products/{product}/discounts/{id}', [DiscountController::class, 'destroy']); // 
});

// Admin Routes for Product (only accessible to authenticated admins)
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/products', [ProductController::class, 'index']); // done
    Route::delete('/products/{id}', [ProductController::class, 'destroy']); // done
    Route::delete('/products/{product}/reviews/{id}/admin', [ReviewController::class, 'destroyByAdmin']); // done
    // Route::delete('/products/{product}/discounts/{id}', [DiscountController::class, 'destroy']);
    // Route::put('/admin/products/{id}', [ProductController::class, 'updateByAdmin']);
});

// Seller Routes for product (only accessible to authenticated sellers)
Route::middleware(['auth:sanctum', 'role:buyer'])->group(function () {
    Route::post('/products/{product}/reviews', [ReviewController::class, 'store']); // done
    Route::put('/products/{product}/reviews/{id}', [ReviewController::class, 'update']); // done
    Route::delete('/products/{product}/reviews/{id}/buyer', [ReviewController::class, 'destroyByBuyer']); // done
});

// Ping endpoint
Route::get('/ping', function () {
    return response()->json([
        'message' => 'pong',
        'status' => 'success',
        'timestamp' => now()
    ]);
});