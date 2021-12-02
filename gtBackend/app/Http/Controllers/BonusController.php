<?php

namespace App\Http\Controllers;

use App\Models\Bonus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Validator;

class BonusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // get user input and validate it, only accepts required input.
        $input = $request->only(['first_name', 'last_name', 'date', 'date_from', 'date_to']);
        $validator = Validator::make($input, [
            'first_name'=>'string|nullable',
            'last_name'=>'string|nullable',
            'date'=>'date|nullable',
            'date_from'=>'date|nullable',
        ]);
        // if validation fails, return an error.
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 403);
        }
        // if only username provided, return every user bonus entry
        // if only date provided, return bonuses of all users in given data range
        // if both provided return only given users bonus from selected range
        
        $first_name = $request->input("first_name");
        $first_name = $request->input("first_name");
        $date_from = $request->input("date_from");
        $date_to = $request->input("date_to");

        // conditional requests.
        if ($request->missing('date_from') || $request->missing('date_to')) {
            // find user based on submitted input
            $user = User::where([
                ["first_name","like", "%{$first_name}%"],
                ["last_name", "like", "%{$last_name}%"],
            ])->select('id', 'first_name', 'last_name')->first();
                // find related bonus in bonuses table
            $bonuses = Bonus::where('user_id', $user->id)->get();        
                // return bonuses and username
            return response()->json([
                'bonus' => $bonuses,
                'username' => "{$user->first_name} {$user->last_name}",
                'tag' => 'from no date'
            ], 200);

        } elseif ($request->missing('first_name') || $request->missing('last_name')) {

            $bonuses = Bonus::whereBetween('bonus_date', [$date_from, $date_to])->get();

            $ids = $bonuses->pluck('user_id');

            $users= User::whereIn('id', $ids)->select('first_name', 'last_name')->get();

            // foreach ($bonuses as $bonus) {
            //     return {}
            // }

            return response([
                'bonus' => $bonuses,
                'ids' => $ids,
                'users' => $users,
                'tag' => 'from no name'
            ], 200);
        }

        $bonus = DB::table('bonuses')->select('user_id as user_id')->join('users', 'bonuses.user_id', '=', 'users.id');

        return $request;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->only(['user_id','bogof', 'designer_frames', 'coatings', 'cx_number', 'bonus_date']);
        $validator = Validator::make($input, [
            'bogof' => 'integer',
            'designer_frames' => 'integer',
            'coatings' => 'integer',
            'cx_number' => 'required|integer',
            'bonus_date' => 'required|date|'
        ]);
        // check if validation passed, if not throw a validator error and return status 400.
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 403);
        }
        // if validation passed, create new Bonus entry in DB
        $bonus = Bonus::create(array_merge(
            $validator->validated(),
            ['user_id' => $request->user_id] 
        ));

        if ($bonus->wasRecentlyCreated) {
            return response()->json([
                'message' => 'Resource successfully created',
                'request' => $bonus
            ],201);
        } else {
            return response()->json([
                'failure' => 'Failed to create resource, failed dependency.'
            ], 424);
        }
        
        // return status 201 -created and a successful message.
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Bonus  $bonus
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        return response()->json('it works', 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Bonus  $bonus
     * @return \Illuminate\Http\Response
     */
    public function edit(Bonus $bonus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Bonus  $bonus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bonus $bonus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bonus  $bonus
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bonus $bonus)
    {
        //
    }
}
