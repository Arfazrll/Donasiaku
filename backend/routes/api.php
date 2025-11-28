<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DonationController;

// API Routes

// Test endpoint
Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'API is working!',
        'timestamp' => now()->toDateTimeString(),
    ]);
});

// Diagnostic endpoint
Route::get('/diagnostic', function () {
    return response()->json([
        'success' => true,
        'data' => [
            'laravel_version' => app()->version(),
            'php_version' => PHP_VERSION,
            'environment' => config('app.env'),
            'debug' => config('app.debug'),
            'database_connection' => config('database.default'),
            'sanctum_enabled' => class_exists(\Laravel\Sanctum\Sanctum::class),
        ],
    ]);
});

// Database test endpoint
Route::get('/test-db', function () {
    try {
        \DB::connection()->getPdo();
        
        $usersCount = \App\Models\User::count();
        $donationsCount = \App\Models\Donation::count();
        
        return response()->json([
            'success' => true,
            'message' => 'Database connected successfully',
            'counts' => [
                'users' => $usersCount,
                'donations' => $donationsCount,
            ],
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Database connection failed',
            'error' => $e->getMessage(),
        ], 500);
    }
});

// Public Routes (No Authentication Required)

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public Donation Routes
Route::get('/donations', [DonationController::class, 'index']);
Route::get('/donations/{id}', [DonationController::class, 'show']);

// Protected Routes (Authentication Required)

Route::middleware('auth:sanctum')->group(function () {
    // Auth Routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Donation CRUD Routes
    Route::post('/donations', [DonationController::class, 'store']);
    Route::put('/donations/{id}', [DonationController::class, 'update']);
    Route::delete('/donations/{id}', [DonationController::class, 'destroy']);
    
    // My Donations Route
    Route::get('/my-donations', [DonationController::class, 'myDonations']);
    
    // Update Status Route
    Route::patch('/donations/{id}/status', [DonationController::class, 'updateStatus']);
});