<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Http\Requests\StoreDonationRequest;
use App\Http\Requests\UpdateDonationRequest;
use App\Http\Resources\DonationResource;
use App\Http\Resources\DonationCollection;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DonationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Donation::with('user');

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

        return response()->json([
            'success' => true,
            'data' => new DonationCollection($donations),
        ], 200);
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
                'data' => new DonationResource($donation->load('user')),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Gagal membuat donasi',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show(string $id): JsonResponse
    {
        $donation = Donation::with('user')->find($id);

        if (!$donation) {
            return response()->json([
                'success' => false,
                'message' => 'Donasi tidak ditemukan',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new DonationResource($donation),
        ], 200);
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

            $donation->update($request->only([
                'nama',
                'kategori',
                'jumlah',
                'deskripsi',
                'lokasi',
                'image',
                'status',
            ]));

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Donasi berhasil diupdate',
                'data' => new DonationResource($donation->load('user')),
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate donasi',
                'error' => $e->getMessage(),
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

            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus donasi',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function myDonations(Request $request): JsonResponse
    {
        $query = Donation::with('user')->where('user_id', Auth::id());

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $perPage = $request->get('per_page', 15);
        $donations = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => new DonationCollection($donations),
        ], 200);
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
                'data' => new DonationResource($donation->load('user')),
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate status donasi',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}