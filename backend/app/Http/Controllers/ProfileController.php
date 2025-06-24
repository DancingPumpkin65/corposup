<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function completeUserInfo(Request $request)
    {
        $user = Auth::user();
    
        $validated = $request->validate([
            'phone' => 'required|string|max:20|min:9',
            'city' => 'required|string|max:255',
            'photo_profile' => 'nullable|image|max:2048',
        ]);
    
        // save image if exist
        if ($request->hasFile('photo_profile')) {
            $filename = $request->file('photo_profile')->storeAs(
                'profiles',
                uniqid() . '.' . $request->file('photo_profile')->getClientOriginalExtension(),
                'public'
            );
            $validated['photo_profile'] = $filename;
        }
    
        
        $user->update($validated);
    
        return response()->json([
            'message' => 'User profile completed successfully.',
            'user' => $user->fresh()
        ]);
    }
    


    public function completeCompanyInfo(Request $request)
    {
        $user = Auth::user();

        if ($user->role !== 'seller') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $request->validate([
            'company_name' => 'required|string',
            'company_phone' => 'required|string',
            'sector' => 'nullable|string',
            'ice_number' => 'nullable|string',
            'legal_form' => 'nullable|string',
            'website' => 'nullable|url',
            'address1' => 'required|string',
            'address2' => 'nullable|string',
            'city' => 'required|string',
            'country' => 'required|string',
        ]);

        $company = Company::updateOrCreate(
            ['user_id' => $user->id],
            $request->only([
                'company_name',
                'company_phone',
                'sector',
                'ice_number',
                'legal_form',
                'website',
                'address1',
                'address2',
                'city',
                'country'
            ])
        );

        return response()->json([
            'message' => 'Company info completed successfully',
            'company' => $company
        ]);
    }


    public function updateProfile(Request $request)
    {
        $user = Auth::user(); 

        $validated = $request->validate([
            'firstname' => 'nullable|string|max:255',
            'lastname' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:255',
            'photo_profile' => 'nullable|image|max:2048',
            'role' => 'nullable|in:buyer,seller',
            // check the password
            'old_password' => 'nullable|string',
            'new_password' => 'nullable|string|min:8|confirmed', 
        ]);

        // If there is a change in the image
        if ($request->hasFile('photo_profile')) {
            $filename = $request->file('photo_profile')->storeAs(
                'profiles',
                uniqid() . '.' . $request->file('photo_profile')->getClientOriginalExtension(),
                'public'
            );
            $validated['photo_profile'] = $filename;
        }

        // Update personal data (all except password if present)
        $user->update([
            'firstname' => $validated['firstname'] ?? $user->firstname,
            'lastname' => $validated['lastname'] ?? $user->lastname,
            'email' => $validated['email'] ?? $user->email,
            'phone' => $validated['phone'] ?? $user->phone,
            'city' => $validated['city'] ?? $user->city,
            'photo_profile' => $validated['photo_profile'] ?? $user->photo_profile,
            'role' => $validated['role'] ?? $user->role,
        ]);

        // If the user wants to change the password
        if ($request->has('old_password') && $request->has('new_password')) {
            if (Hash::check($request->old_password, $user->password)) {
                $user->update([
                    'password' => Hash::make($request->new_password),
                ]);
            } else {
                return response()->json(['message' => 'Old password is incorrect.'], 400);
            }
        }

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user
        ]);
    }

    // Show the company of the authenticated seller
    public function showSellerCompany()
    {
        $user = Auth::user();

        if ($user->role !== 'seller') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $company = Company::where('user_id', $user->id)->first();

        if (!$company) {
            return response()->json(['message' => 'No company found'], 404);
        }

        return response()->json([
            'company' => $company
        ]);
    }

    // List all companies for admins
    public function listCompanies()
    {
        $user = Auth::user();

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $companies = Company::all();

        return response()->json([
            'companies' => $companies
        ]);
    }

    // Show a specific company for admins
    public function showCompany($id)
    {
        $user = Auth::user();

        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Access denied'], 403);
        }

        $company = Company::find($id);

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        return response()->json([
            'company' => $company
        ]);
    }


}
