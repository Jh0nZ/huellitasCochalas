<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pet;
use Exception;
use Illuminate\Validation\ValidationException;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'required|string|max:255',
                'sterilized' => 'required|boolean',
                'location' => 'required|string|max:255',
                'breed_id' => 'required|exists:breeds,id',
                'size_id' => 'required|exists:sizes,id',
                'user_id' => 'required|exists:users,id',
            ]);

            $pet = new Pet([
                'name' => $request->get('name'),
                'description' => $request->get('description'),
                'status' => $request->get('status'),
                'sterilized' => $request->get('sterilized'),
                'location' => $request->get('location'),
                'breed_id' => $request->get('breed_id'),
                'size_id' => $request->get('size_id'),
                'user_id' => $request->get('user_id'),
            ]);

            $pet->save();

            return response()->json(['message' => 'Pet created successfully', 'data' => $pet], 201);
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
