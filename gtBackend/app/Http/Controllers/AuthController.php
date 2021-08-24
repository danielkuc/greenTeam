<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;


class AuthController extends Controller
{
    //login method
    public function login(Request $request)
    {
        $validator = Validator::make($request->only('email', 'password'), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        // check if validation passed, if not throw validator error and 422 http status.
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        // authenticate user using Auth.
        Auth::attempt($validator->validated());
        // return user and 200 http status.
        return response()->json([
            'message' => 'User successfully authenticated',
            'user' => Auth::user()
        ], 200);           
        
    }
}
