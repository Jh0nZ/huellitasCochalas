<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pet;
use Exception;
use Illuminate\Validation\ValidationException;
use App\Models\Image;
use App\Models\PetImage;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $pets = Pet::all();
            return response()->json(['data' => $pets], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred', 'data' => $e->getMessage()], 500);
        }
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
                'images' => 'required|array|min:1',
                'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
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

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $file) {
                    $path = $file->store('images', 'public');
                    $image = Image::create([
                        'filename' => $file->getClientOriginalName(),
                        'path' => $path,
                        'mime_type' => $file->getClientMimeType(),
                        'size' => $file->getSize(),
                    ]);

                    PetImage::create([
                        'pet_id' => $pet->id,
                        'image_id' => $image->id,
                    ]);
                }
            }

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
        try {
            $pet = Pet::findOrFail($id);
            return response()->json(['data' => $pet], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Pet not found', 'data' => $e->getMessage()], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'sometimes|required|string|max:255',
                'sterilized' => 'sometimes|required|boolean',
                'location' => 'sometimes|required|string|max:255',
                'breed_id' => 'sometimes|required|exists:breeds,id',
                'size_id' => 'sometimes|required|exists:sizes,id',
                'user_id' => 'sometimes|required|exists:users,id',
            ]);

            $pet = Pet::findOrFail($id);
            $pet->update($request->all());

            return response()->json(['message' => 'Pet updated successfully', 'data' => $pet], 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'data' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred', 'data' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $pet = Pet::findOrFail($id);
            $pet->delete();

            return response()->json(['message' => 'Pet deleted successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred', 'data' => $e->getMessage()], 500);
        }
    }
}
