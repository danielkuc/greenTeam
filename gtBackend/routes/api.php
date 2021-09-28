<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::post('/signin', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/register', [UserController::class, 'store']);


// Private routes
Route::middleware(['auth:sanctum'])->group(function () 
{
    Route::post('/signout', [AuthController::class, 'logout']);
    Route::post('/me', [AuthController::class, 'me']);
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/search/{name}', [UserController::class, 'show']);
    Route::put('users/update/{id}', [UserController::class, 'update']);
    Route::delete('/remove/{id}', [UserController::class, 'destroy']);
});