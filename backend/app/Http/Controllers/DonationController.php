<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class DonationController extends Controller
{
    /**
     * Get all donations (Public)
     */
    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 15);
            $status = $request->input('status');
            $kategori = $request->input('kategori');
            $search = $request->input('search');

            $query = Donation::with('donatur:id,name,email,phone');

            // Filter by status
            if ($status) {
                $query->where('status', $status);
            }

            // Filter by kategori
            if ($kategori) {
                $query->where('kategori', $kategori);
            }

            // Search by nama or deskripsi
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nama', 'like', "%{$search}%")
                      ->orWhere('deskripsi', 'like', "%{$search}%");
                });
            }

            $donations = $query->orderBy('created_at', 'desc')->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => [
                    'data' => $donations->items(),
                    'meta' => [
                        'total' => $donations->total(),
                        'per_page' => $donations->perPage(),
                        'current_page' => $donations->currentPage(),
                        'last_page' => $donations->lastPage(),
                        'from' => $donations->firstItem(),
                        'to' => $donations->lastItem(),
                    ],
                ],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch donations: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get donation by ID (Public)
     */
    public function show($id)
    {
        try {
            $donation = Donation::with('donatur:id,name,email,phone')->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $donation,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch donation: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create new donation (Protected)
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'kategori' => 'required|in:makanan,pakaian,elektronik,furnitur,buku,lainnya',
                'jumlah' => 'required|integer|min:1',
                'deskripsi' => 'required|string',
                'lokasi' => 'required|string|max:255',
                'image' => 'nullable|string',
            ]);

            $donation = Donation::create([
                'user_id' => Auth::id(),
                'nama' => $validated['nama'],
                'kategori' => $validated['kategori'],
                'jumlah' => $validated['jumlah'],
                'deskripsi' => $validated['deskripsi'],
                'lokasi' => $validated['lokasi'],
                'image' => $validated['image'] ?? null,
                'status' => 'aktif',
            ]);

            $donation->load('donatur:id,name,email,phone');

            return response()->json([
                'success' => true,
                'message' => 'Donasi berhasil dibuat',
                'data' => $donation,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create donation: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update donation (Protected - Owner Only)
     */
    public function update(Request $request, $id)
    {
        try {
            $donation = Donation::findOrFail($id);

            // Check if user is the owner
            if ($donation->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to update this donation',
                ], 403);
            }

            $validated = $request->validate([
                'nama' => 'sometimes|required|string|max:255',
                'kategori' => 'sometimes|required|in:makanan,pakaian,elektronik,furnitur,buku,lainnya',
                'jumlah' => 'sometimes|required|integer|min:1',
                'deskripsi' => 'sometimes|required|string',
                'lokasi' => 'sometimes|required|string|max:255',
                'image' => 'nullable|string',
                'status' => 'sometimes|required|in:aktif,selesai',
            ]);

            $donation->update($validated);
            $donation->load('donatur:id,name,email,phone');

            return response()->json([
                'success' => true,
                'message' => 'Donasi berhasil diupdate',
                'data' => $donation,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found',
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update donation: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete donation (Protected - Owner Only)
     */
    public function destroy($id)
    {
        try {
            $donation = Donation::findOrFail($id);

            // Check if user is the owner
            if ($donation->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to delete this donation',
                ], 403);
            }

            $donation->delete();

            return response()->json([
                'success' => true,
                'message' => 'Donasi berhasil dihapus',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete donation: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get current user's donations (Protected)
     */
    public function myDonations(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 15);
            $status = $request->input('status');

            $query = Donation::where('user_id', Auth::id())
                ->with('donatur:id,name,email,phone');

            if ($status) {
                $query->where('status', $status);
            }

            $donations = $query->orderBy('created_at', 'desc')->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => [
                    'data' => $donations->items(),
                    'meta' => [
                        'total' => $donations->total(),
                        'per_page' => $donations->perPage(),
                        'current_page' => $donations->currentPage(),
                        'last_page' => $donations->lastPage(),
                        'from' => $donations->firstItem(),
                        'to' => $donations->lastItem(),
                    ],
                ],
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch donations: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update donation status (Protected - Owner Only)
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            $donation = Donation::findOrFail($id);

            // Check if user is the owner
            if ($donation->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to update this donation',
                ], 403);
            }

            $validated = $request->validate([
                'status' => 'required|in:aktif,selesai',
            ]);

            $donation->update(['status' => $validated['status']]);
            $donation->load('donatur:id,name,email,phone');

            return response()->json([
                'success' => true,
                'message' => 'Status donasi berhasil diupdate',
                'data' => $donation,
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Donation not found',
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update status: ' . $e->getMessage(),
            ], 500);
        }
    }
}