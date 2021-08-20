<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{   
    // get all users
    public function index() {
        return User::all();
    }

    // add new users to database
    public function register(Request $request) {
        $input = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|unique:users|email',
            'occupation' => 'required|string',
            'password' => 'required|string|confirmed',

        ]);

        $user = User::create([
            'first_name' => $input['first_name'],
            'last_name' => $input['last_name'],
            'email' => $input['email'],
            'occupation' => $input['occupation'],
            'password' => bcrypt($input['email'])
        ]);

        return $user;
    }

    public function login (Request $request) {
        
        $input = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);
        
        $user = User::where('email', $input['email'])->first();

        if (!$user || Hash::check($input['password'], $user->password)) {
            return response(['error' => 'Email or password incorrect'], 401);
        }

        return $user;
    }
}
