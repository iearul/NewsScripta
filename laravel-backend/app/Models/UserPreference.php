<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'authors',
        'categories',
        'sources',
    ];

    protected $casts = [
        'authors' => 'array',
        'categories' => 'array',
        'sources' => 'array',
    ];
}
