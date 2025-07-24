<?php

use App\Http\Controllers\PostsController;
use App\Http\Controllers\RootController;
use Illuminate\Support\Facades\Route;

Route::get('/', [RootController::class, "index"])->name('root');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/posts/new', [PostsController::class, "create"])->name('posts.create');
    Route::post('/posts/new', [PostsController::class, "store"])->name('posts.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
