<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
        // L'admin peut aussi accéder aux informations du vendeur
        public function showSellerForAdmin($userId)
        {
            if (Auth::user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized.'], 403);
            }
        
            // get the user
            $user = User::with('company')->find($userId);
        
            if (!$user) {
                return response()->json(['message' => 'User not found.'], 404);
            }
        
            return response()->json([
                'message' => 'User profile fetched successfully.',
                'user' => $user,
                'company' => $user->company 
            ]);
            
        }
}
