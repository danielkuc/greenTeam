<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
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
                return['no dice'];
            }
        }
}
