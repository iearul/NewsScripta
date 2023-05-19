<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;


class PreferenceController extends Controller
{
    //Set preference by user id
    public function setPreference(Request $request)
    {
        $user = auth()->user();
        $preference = $user->preference;
        $preference->authors = $request->authors;
        $preference->categories = $request->categories;
        $preference->sources = $request->sources;
        $preference->save();
        return response()->json([
            'message' => "New preference updated",
            'data' => $preference,
            'status' => 201,
        ], 201);
    }

    public function getPreference()
    {
        $preference = auth()->user()->preference;
        return response()->json([
            'message' => "All preference",
            'data' => $preference,
            'status' => 200,
        ], 200);
    }

    public function getAllPreference()
    {
        $category = [];
        foreach (config('category.category') as $value) {
            $category[] = $value['name'];
        }
        $data['categories'] = $category;
        $data['authors'] = News::select('author')->distinct()->get()->map(function ($item) {
            return $item->author;
        });
        $data['sources'] = News::select('source')->distinct()->get()->map(function ($item) {
            return $item->source;
        });
        return response()->json([
            'message' => "All preference",
            'data' => $data,
            'status' => 200,
        ], 200);
    }
}
