<?php

use App\Http\Controllers\RootController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [RootController::class, "index"])->name('root');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
