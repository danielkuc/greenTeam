<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
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
            return response()->json($validator->errors(),422);
        } 
        // if validation passed check if user exists and log in
        else if (Auth::attempt($validator->validated())) {
            return response()->json([
                'message' => 'User successfully signed in',
                'user' => Auth::user()
            ],200);        
        }
        // if both above conditions fail, return error
        return response()->json([
            'message' => 'Invalid credentials'
        
        ],404);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'message' => 'User successfully signed out'
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email'=>'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
                    ? back()->with(['status' => __($status)])
                    : back()->withErrors(['email' => __($status)]);
    }
}
