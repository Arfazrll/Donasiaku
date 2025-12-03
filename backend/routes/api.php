<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DonationController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('donations', [DonationController::class, 'index']);
Route::get('donations/{id}', [DonationController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
    
    Route::post('donations', [DonationController::class, 'store']);
    Route::put('donations/{id}', [DonationController::class, 'update']);
    Route::delete('donations/{id}', [DonationController::class, 'destroy']);
    Route::get('my-donations', [DonationController::class, 'myDonations']);
    Route::patch('donations/{id}/status', [DonationController::class, 'updateStatus']);
});