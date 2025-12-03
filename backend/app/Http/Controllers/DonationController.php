<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Http\Requests\StoreDonationRequest;
use App\Http\Requests\UpdateDonationRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DonationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Donation::query();

            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            if ($request->has('kategori')) {
                $query->where('kategori', $request->kategori);
            }

            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('nama', 'like', "%{$search}%")
                      ->orWhere('deskripsi', 'like', "%{$search}%")
                      ->orWhere('lokasi', 'like', "%{$search}%");
                });
            }

            $perPage = $request->get('per_page', 15);
            $donations = $query->orderBy('created_at', 'desc')->paginate($perPage);

            $formattedData = [];
            foreach ($donations->items() as $donation) {
                $formattedData[] = [
                    'id' => $donation->id,
                    'userId' => $donation->user_id,
                    'nama' => $donation->nama,
                    'kategori' => $donation->kategori,
                    'jumlah' => $donation->jumlah,
                    'deskripsi' => $donation->deskripsi,
                    'lokasi' => $donation->lokasi,
                    'image' => $donation->image,
                    'status' => $donation->status,
                    'createdAt' => $donation->created_at->toIso8601String(),
                    'updatedAt' => $donation->updated_at->toIso8601String(),
                ];
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'data' => $formattedData,
                    'meta' => [
                        'total' => $donations->total(),
                        'per_page' => $donations->perPage(),
                        'current_page' => $donations->currentPage(),
                        'last_page' => $donations->lastPage(),
                    ],
                ],
            ], 200);
            
        } catch (\Exception $e) {
            Log::error('Error fetching donations: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data donasi',
                'data' => [
                    'data' => [],
                    'meta' => [
                        'total' => 0,
                        'per_page' => 15,
                        'current_page' => 1,
                        'last_page' => 1,
                    ],
                ],
            ], 200);
        }
    }

    public function myDonations(Request $request): JsonResponse
    {
        try {
            if (!Auth::check()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated',
                    'data' => [
                        'data' => [],
                        'meta' => [
                            'total' => 0,
                            'per_page' => 15,
                            'current_page' => 1,
                            'last_page' => 1,
                        ],
                    ],
                ], 401);
            }

            $query = Donation::where('user_id', Auth::id());

            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            $perPage = $request->get('per_page', 15);
            $donations = $query->orderBy('created_at', 'desc')->paginate($perPage);

            $formattedData = [];
            foreach ($donations->items() as $donation) {
                $formattedData[] = [
                    'id' => $donation->id,
                    'userId' => $donation->user_id,
                    'nama' => $donation->nama,
                    'kategori' => $donation->kategori,
                    'jumlah' => $donation->jumlah,
                    'deskripsi' => $donation->deskripsi,
                    'lokasi' => $donation->lokasi,
                    'image' => $donation->image,
                    'status' => $donation->status,
                    'createdAt' => $donation->created_at->toIso8601String(),
                    'updatedAt' => $donation->updated_at->toIso8601String(),
                ];
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'data' => $formattedData,
                    'meta' => [
                        'total' => $donations->total(),
                        'per_page' => $donations->perPage(),
                        'current_page' => $donations->currentPage(),
                        'last_page' => $donations->lastPage(),
                    ],
                ],
            ], 200);
            
        } catch (\Exception $e) {
            Log::error('Error fetching my donations: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data donasi',
                'data' => [
                    'data' => [],
                    'meta' => [
                        'total' => 0,
                        'per_page' => 15,
                        'current_page' => 1,
                        'last_page' => 1,
                    ],
                ],
            ], 200);
        }
    }

    public function store(StoreDonationRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $donation = Donation::create([
                'user_id' => Auth::id(),
                'nama' => $request->nama,
                'kategori' => $request->kategori,
                'jumlah' => $request->jumlah,
                'deskripsi' => $request->deskripsi,
                'lokasi' => $request->lokasi,
                'image' => $request->image,
                'status' => 'aktif',
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Donasi berhasil dibuat',
                'data' => [
                    'id' => $donation->id,
                    'userId' => $donation->user_id,
                    'nama' => $donation->nama,
                    'kategori' => $donation->kategori,
                    'jumlah' => $donation->jumlah,
                    'deskripsi' => $donation->deskripsi,
                    'lokasi' => $donation->lokasi,
                    'image' => $donation->image,
                    'status' => $donation->status,
                    'createdAt' => $donation->created_at->toIso8601String(),
                    'updatedAt' => $donation->updated_at->toIso8601String(),
                ],
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating donation: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat donasi',
            ], 500);
        }
    }

    public function show(string $id): JsonResponse
    {
        try {
            $donation = Donation::find($id);

            if (!$donation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Donasi tidak ditemukan',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $donation->id,
                    'userId' => $donation->user_id,
                    'nama' => $donation->nama,
                    'kategori' => $donation->kategori,
                    'jumlah' => $donation->jumlah,
                    'deskripsi' => $donation->deskripsi,
                    'lokasi' => $donation->lokasi,
                    'image' => $donation->image,
                    'status' => $donation->status,
                    'createdAt' => $donation->created_at->toIso8601String(),
                    'updatedAt' => $donation->updated_at->toIso8601String(),
                ],
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching donation: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Donasi tidak ditemukan',
            ], 404);
        }
    }

    public function update(UpdateDonationRequest $request, string $id): JsonResponse
    {
        try {
            $donation = Donation::find($id);

            if (!$donation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Donasi tidak ditemukan',
                ], 404);
            }

            if ($donation->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses untuk mengupdate donasi ini',
                ], 403);
            }

            DB::beginTransaction();

            $updateData = $request->only([
                'nama',
                'kategori',
                'jumlah',
                'deskripsi',
                'lokasi',
                'status',
            ]);

            if ($request->has('image')) {
                $updateData['image'] = $request->image;
            }

            $donation->update($updateData);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Donasi berhasil diupdate',
                'data' => [
                    'id' => $donation->id,
                    'userId' => $donation->user_id,
                    'nama' => $donation->nama,
                    'kategori' => $donation->kategori,
                    'jumlah' => $donation->jumlah,
                    'deskripsi' => $donation->deskripsi,
                    'lokasi' => $donation->lokasi,
                    'image' => $donation->image,
                    'status' => $donation->status,
                    'createdAt' => $donation->created_at->toIso8601String(),
                    'updatedAt' => $donation->updated_at->toIso8601String(),
                ],
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating donation: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate donasi',
            ], 500);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $donation = Donation::find($id);

            if (!$donation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Donasi tidak ditemukan',
                ], 404);
            }

            if ($donation->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses untuk menghapus donasi ini',
                ], 403);
            }

            DB::beginTransaction();

            $donation->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Donasi berhasil dihapus',
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting donation: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus donasi',
            ], 500);
        }
    }

    public function updateStatus(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:aktif,selesai',
        ]);

        try {
            $donation = Donation::find($id);

            if (!$donation) {
                return response()->json([
                    'success' => false,
                    'message' => 'Donasi tidak ditemukan',
                ], 404);
            }

            if ($donation->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Anda tidak memiliki akses untuk mengupdate status donasi ini',
                ], 403);
            }

            DB::beginTransaction();

            $donation->update([
                'status' => $request->status,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Status donasi berhasil diupdate',
                'data' => [
                    'id' => $donation->id,
                    'userId' => $donation->user_id,
                    'nama' => $donation->nama,
                    'kategori' => $donation->kategori,
                    'jumlah' => $donation->jumlah,
                    'deskripsi' => $donation->deskripsi,
                    'lokasi' => $donation->lokasi,
                    'image' => $donation->image,
                    'status' => $donation->status,
                    'createdAt' => $donation->created_at->toIso8601String(),
                    'updatedAt' => $donation->updated_at->toIso8601String(),
                ],
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating status: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate status donasi',
            ], 500);
        }
    }
}