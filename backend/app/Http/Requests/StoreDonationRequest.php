<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDonationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => 'required|string|max:200',
            'kategori' => 'required|in:pakaian,elektronik,buku,mainan,perabotan,lainnya',
            'jumlah' => 'required|integer|min:1',
            'deskripsi' => 'required|string',
            'lokasi' => 'required|string|max:255',
            'image' => 'nullable|string',
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
        ];
    }
}