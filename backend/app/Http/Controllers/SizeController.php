<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Size;
use Symfony\Component\HttpFoundation\Response;

class SizeController extends Controller
{
    public function index()
    {
        $sizes = Size::all();
        return response()->json($sizes, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $size = Size::create($request->all());
        return response()->json($size, Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $size = Size::findOrFail($id);
        return response()->json($size, Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $size = Size::findOrFail($id);
        $size->update($request->all());
        return response()->json($size, Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $size = Size::findOrFail($id);
        $size->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
