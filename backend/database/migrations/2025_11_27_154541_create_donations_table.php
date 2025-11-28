<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nama', 200);
            $table->enum('kategori', ['pakaian', 'elektronik', 'buku', 'mainan', 'perabotan', 'lainnya']);
            $table->integer('jumlah')->default(1);
            $table->text('deskripsi');
            $table->string('lokasi', 255);
            $table->text('image')->nullable();
            $table->enum('status', ['aktif', 'selesai'])->default('aktif');
            $table->timestamps();
            
            $table->index('user_id');
            $table->index('status');
            $table->index('kategori');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};