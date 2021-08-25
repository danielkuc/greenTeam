<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        // limit accepted input to only necessary fields.
        $input = $request->only(['first_name', 'last_name', 'email', 'occupation', 'password', 'password_confirmation', 'remember_token']);
        // validate request
        $validator = Validator::make($input, [
            'first_name' => 'required|string|between:3,100',
            'last_name' => 'required|string|between:3,100',
            'email' => 'required|string|email|max:100|unique:users',
            'occupation' => 'required|string|between:3,100',
            'password' => 'required|string|confirmed|min:6',
            'password_confirmation' => 'required|string|min:6',
        ]);
        // check if validation passed, if not throw a validator error and return status 400.
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        // create new User, merge validated input and password encryption.
        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        )); 
        // return user and 201 - created status.
        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  str  $fname
     * @return \Illuminate\Http\Response
     */
    public function show($name)
    {
        // query DB and return users which first_name or last_name contains $name
        return User::where('first_name', 'like', '%'.$name.'%')->orWhere('last_name', 'like', '%'.$name.'%')->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // limit accepted input to only necessary fields.
        $input = $request->only(['first_name', 'last_name', 'email', 'occupation', 'password', 'password_confirmation', 'remember_token']);
        // validate request
        $validator = Validator::make($input, [
            'first_name' => 'required|string|between:3,100',
            'last_name' => 'required|string|between:3,100',
            'email' => 'required|string|email|max:100|unique:users',
            'occupation' => 'required|string|between:3,100',
            'password' => 'required|string|confirmed|min:6',
            'password_confirmation' => 'required|string|min:6',
        ]);        
            
        // check if validation passed, if not throw a validator error and return status 400.
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }            
        
        $updated = User::where('id', $id)->update((array_merge(
        $validator->validated(),
        ['password' => bcrypt($request->password)]
        )));

        if (!$updated) {
            return response()->json([
                'message' => 'Update failed'
            ]);
        } else {
            return response()->json([
                'success' => 'Updated'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return User::destroy($id);
    }
}
