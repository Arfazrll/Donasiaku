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
            'nama' => 'sometimes|required|string|max:200',
            'kategori' => 'sometimes|required|in:pakaian,elektronik,buku,mainan,perabotan,lainnya',
            'jumlah' => 'sometimes|required|integer|min:1',
            'deskripsi' => 'sometimes|required|string',
            'lokasi' => 'sometimes|required|string|max:255',
            'image' => 'nullable|string',
            'status' => 'sometimes|required|in:aktif,selesai',
        ];
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama barang harus diisi',
            'nama.max' => 'Nama barang maksimal 200 karakter',
            'kategori.required' => 'Kategori harus dipilih',
            'kategori.in' => 'Kategori tidak valid',
            'jumlah.required' => 'Jumlah harus diisi',
            'jumlah.integer' => 'Jumlah harus berupa angka',
            'jumlah.min' => 'Jumlah minimal 1',
            'deskripsi.required' => 'Deskripsi harus diisi',
            'lokasi.required' => 'Lokasi pengambilan harus diisi',
            'lokasi.max' => 'Lokasi maksimal 255 karakter',
            'status.in' => 'Status tidak valid',
        ];
    }
}