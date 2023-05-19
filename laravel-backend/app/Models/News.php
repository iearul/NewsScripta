<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'urlToImage',
        'description',
        'newsUrl',
        'author',
        'source',
        'category',
    ];

    //create scope for filter news by category
    public function scopeFilter($query)
    {
        $category = auth()->user()->preference->categories;
        $author = auth()->user()->preference->authors;
        $source = auth()->user()->preference->sources;
        return $query->orwhereIn('category', $category ?? [])->orWhereIn('author', $author ?? [])->orWhereIn('source', $source ?? []);
    }

    //scope to search news by title
    public function scopeSearch($query, $search)
    {
        return $query->where('title', 'like', '%' . $search . '%');
    }
}
