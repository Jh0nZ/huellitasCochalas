<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Breed;
use Symfony\Component\HttpFoundation\Response;

class BreedController extends Controller
{
    public function index()
    {
        $breeds = Breed::all();
        return response()->json($breeds, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $breed = Breed::create($validatedData);
        return response()->json($breed, Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $breed = Breed::findOrFail($id);
        return response()->json($breed, Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $breed = Breed::findOrFail($id);
        $breed->update($validatedData);
        return response()->json($breed, Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $breed = Breed::findOrFail($id);
        $breed->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
