<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDonationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => 'sometimes|required|string|max:255',
            'kategori' => 'sometimes|required|string|in:pakaian,elektronik,buku,mainan,perabotan,lainnya',
            'jumlah' => 'sometimes|required|integer|min:0',
            'deskripsi' => 'sometimes|required|string',
            'lokasi' => 'sometimes|required|string',
            'image' => 'nullable|string',
            'status' => 'sometimes|required|string|in:aktif,selesai',
        ];
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama barang harus diisi',
            'nama.max' => 'Nama barang maksimal 255 karakter',
            'kategori.required' => 'Kategori harus dipilih',
            'kategori.in' => 'Kategori tidak valid',
            'jumlah.required' => 'Jumlah harus diisi',
            'jumlah.integer' => 'Jumlah harus berupa angka',
            'jumlah.min' => 'Jumlah minimal 0',
            'deskripsi.required' => 'Deskripsi harus diisi',
            'lokasi.required' => 'Lokasi pengambilan harus diisi',
            'status.in' => 'Status tidak valid',
        ];
    }
}