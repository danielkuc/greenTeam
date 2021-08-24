<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{   
    // fn fetching all users
    public function index() {
        return User::all();
    }

    // allows user registration and persists to DB
    public function register(Request $request) {
        $input = $request->validate([
            // TO DO: add min and max letters.
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|unique:users|email',
            'occupation' => 'required|string',
            'password' => 'required|string|confirmed',
            'password_confirmation' => 'required|string',
        ]);

        $user = User::create([
            'first_name'=> $input['first_name'],
            'last_name' => $input['last_name'],
            'email' => $input['email'],
            'occupation' => $input['occupation'],
            'password' => bcrypt($input['password'])
        ]);

        return response([
            'user' => $user,
            'message' => 'Registration successful'
        ], 200);
    }

    // allows a user to log in using email 
    public function login(Request $request)
        {   
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            // Auth::attempt($request->only('email', 'password'))

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $test = $request->user();
                // $request->session()->regenerate();
                // works fine until this point, without above code.
                return response([
                    'message' => 'success',
                    'user' => $user,
                    'test' => $test
                ], 200);
            } else {
                return response([
                    'message' => 'invalid credentials'
                ], 401);
            }
        }
}
