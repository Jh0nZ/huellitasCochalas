<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Breed;
use Exception;
use Illuminate\Validation\ValidationException;

class BreedController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $breeds = Breed::all();
        return response()->json($breeds);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:breeds,name',
                'description' => 'nullable|string',
            ]);

            $breed = Breed::create($request->all());
            return response()->json($breed, 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'data' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred', 'data' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $breed = Breed::findOrFail($id);
        return response()->json($breed);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $breed = Breed::findOrFail($id);
        $breed->update($request->all());
        return response()->json($breed);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $breed = Breed::findOrFail($id);
        $breed->delete();
        return response()->json(null, 204);
    }
}
