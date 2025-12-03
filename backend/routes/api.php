<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DonationController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('donations', DonationController::class);
    Route::get('my-donations', [DonationController::class, 'myDonations']);
    Route::patch('donations/{id}/status', [DonationController::class, 'updateStatus']);
});

Route::get('donations', [DonationController::class, 'index']);
Route::get('donations/{id}', [DonationController::class, 'show']);