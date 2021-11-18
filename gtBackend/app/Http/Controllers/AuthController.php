<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
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
            // get the user
            $user = $request->user();

            return response([
                'user'=> $user
            ],200);
        }
        // if both above conditions fail, return error
        return response()->json([
            'message' => 'Invalid credentials'
        
        ],404);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        return response()->json([
            'message' => 'User successfully signed out'
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email'=>'required|email']);
            // sends password reset link with token
        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
                    ? ['status' => __($status)]
                    : ['email' => __($status)];
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token'=>'required',
            'email'=>'required|email',
            'password'=>'required|confirmed'
        ]);

        $status = Password::reset
        (
            $request->only('email', 'password', 'password_confirmation', 'token'),

            function($user) use ($request)
            {
                $user->forceFill([
                    'password' => Hash::make($request->password)
                ])->save();
                
                $user->tokens()->delete();
                
                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response([
                'message' => 'password reset successfully'
            ], 200);
        }

        return response([
            'message' => __($status)
        ], 500);
    }

    public function userCredentials(Request $request)
    {
        // return $request->user();
        if (Auth::check()) {
            return Auth::user();
        } else {
            return response()->json('User Unauthorized'
            , 401);
        }
        

    }
}
