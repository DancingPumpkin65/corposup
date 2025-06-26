<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index(Request $request)
    {
        $query = User::query();
        
        // Handle limit parameter for getting first N users
        if ($request->has('limit')) {
            $limit = (int) $request->get('limit');
            $query->limit($limit);
        }
        
        // Only select necessary fields and exclude sensitive information
        $users = $query->select([
            'id',
            'firstname', 
            'lastname',
            'email',
            'photo_profile',
            'created_at'
        ])
        ->whereNotNull('photo_profile') // Only users with profile photos
        ->orderBy('created_at', 'desc')
        ->get();
        
        return response()->json($users);
    }
    
    /**
     * Display the specified user.
     */
    public function show(User $user)
    {
        return response()->json([
            'id' => $user->id,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'email' => $user->email,
            'photo_profile' => $user->photo_profile,
            'created_at' => $user->created_at
        ]);
    }
}
