<?php

namespace App\Http\Controllers;

use App\Mail\Contratulation;
use App\Models\User;
use App\Models\UserPreference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function registration(Request $request)
    {
        $exist = User::where('email', $request->email)->first();
        if ($exist) return response()->json([
            'message' => "Already have an account",
            'data' => '',
            'status' => 203,
        ], 203);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        if ($user->id) {
            UserPreference::create([
                'user_id' => $user->id,
            ]);
        }

        $user->token = $user->createToken('Token Name')->plainTextToken;
        return response()->json([
            'message' => "Created",
            'data' => $user,
            'status' => 200,
        ], 200);
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) return response()->json([
            'message' => "User Not Found",
            'data' => '',
            'status' => 203,
        ], 203);
        if (!Hash::check($request->password, $user->password)) return response()->json([
            'message' => "Wrong Password",
            'data' => '',
            'status' => 203,
        ], 201);

        $user->token = $user->createToken('Token Name')->plainTextToken;
        return response()->json([
            'message' => "",
            'data' => $user,
            'status' => 200,
        ], 200);

        return $user;
    }
}
