<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Models\Pet;
use Exception;
use Illuminate\Validation\ValidationException;
use App\Models\Image;
use App\Models\PetImage;

/**
 * @OA\Schema(
 *     schema="ValidationError",
 *     type="object",
 *     @OA\Property(property="message", type="string", example="Validation failed"),
 *     @OA\Property(property="data", type="object",
 *         @OA\Property(property="errors", type="object",
 *             @OA\Property(property="name", type="array", @OA\Items(type="string", example="The name field is required.")),
 *             @OA\Property(property="status", type="array", @OA\Items(type="string", example="The status field is required.")),
 *             @OA\Property(property="age", type="array", @OA\Items(type="string", example="The age must be an integer.")),
 *             @OA\Property(property="sterilized", type="array", @OA\Items(type="string", example="The sterilized field must be true or false.")),
 *             @OA\Property(property="location", type="array", @OA\Items(type="string", example="The location field is required.")),
 *             @OA\Property(property="breed_id", type="array", @OA\Items(type="string", example="The selected breed_id is invalid.")),
 *             @OA\Property(property="size_id", type="array", @OA\Items(type="string", example="The selected size_id is invalid.")),
 *             @OA\Property(property="user_id", type="array", @OA\Items(type="string", example="The selected user_id is invalid.")),
 *             @OA\Property(property="images", type="array", @OA\Items(type="string", example="At least one image is required."))
 *         )
 *     )
 * ),
 * @OA\Schema(
 *     schema="Pet",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Fido"),
 *     @OA\Property(property="description", type="string", example="A friendly dog"),
 *     @OA\Property(property="status", type="string", example="available"),
 *     @OA\Property(property="age", type="integer", example=3),
 *     @OA\Property(property="sterilized", type="boolean", example=true),
 *     @OA\Property(property="location", type="string", example="New York"),
 *     @OA\Property(property="breed_id", type="integer", example=1),
 *     @OA\Property(property="size_id", type="integer", example=2),
 *     @OA\Property(property="user_id", type="integer", example=1),
 *     @OA\Property(property="images", type="array",
 *         @OA\Items(type="object", 
 *             @OA\Property(property="filename", type="string"),
 *             @OA\Property(property="path", type="string"),
 *             @OA\Property(property="mime_type", type="string"),
 *             @OA\Property(property="size", type="integer")
 *         )
 *     ),
 * )
 */

class PetController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/pets",
     *     tags={"Pets"},
     *     summary="Get a list of all pets",
     *     description="This endpoint retrieves a list of all pets with their details.",
     *     @OA\Response(
     *         response=200,
     *         description="List of pets retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Pet"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="An error occurred"),
     *             @OA\Property(property="data", type="string", example="Error details")
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        $query = Pet::query();
    
        if ($request->has('size')) {
            $sizes = explode(',', $request->get('size')); 
            $query->whereIn('size_id', $sizes);
        }
    
        if ($request->has('gender')) {
            $genders = explode(',', $request->get('gender')); 
            $query->whereIn('gender', $genders);
        }
    
        if ($request->has('age')) {
            $ageRange = explode('-', $request->get('age')); 
            if (count($ageRange) === 2) {
                $query->whereBetween('age', [(int)$ageRange[0], (int)$ageRange[1]]);
            }
        }
    
        $pets = $query->with(['images', 'size', 'breed'])->get();
    
        return response()->json(['data' => $pets], 200);
    }
    
    

    /**
     * @OA\Post(
     *     path="/api/pets",
     *     tags={"Pets"},
     *     summary="Create a new pet",
     *     description="This endpoint allows you to create a new pet.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "status", "age", "sterilized", "location", "breed_id", "size_id", "user_id", "images"},
     *             @OA\Property(property="name", type="string", example="Fido"),
     *             @OA\Property(property="description", type="string", example="A friendly dog"),
     *             @OA\Property(property="status", type="string", example="available"),
     *             @OA\Property(property="age", type="integer", example=3),
     *             @OA\Property(property="sterilized", type="boolean", example=true),
     *             @OA\Property(property="location", type="string", example="New York"),
     *             @OA\Property(property="breed_id", type="integer", example=1),
     *             @OA\Property(property="size_id", type="integer", example=2),
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="images", type="array", @OA\Items(type="string", format="binary")),
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Pet created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Pet created successfully"),
     *             @OA\Property(property="data", ref="#/components/schemas/Pet")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation failed",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Validation failed"),
     *             @OA\Property(property="data", ref="#/components/schemas/ValidationError")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="An error occurred",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="An error occurred"),
     *             @OA\Property(property="data", type="string", example="Error details")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer',
            'status' => 'required|string|max:255',
            'breed_id' => 'required|integer',
            'size_id' => 'required|integer',
            'sterilized' => 'required|boolean',
            'description' => 'required|string|min:30|max:255',
            'gender' => 'required|in:MACHO,HEMBRA',
            'images' => 'required|array|min:1|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            ]);

            $pet = new Pet([
                'name' => $request->get('name'),
                'description' => $request->get('description'),
                'age' => $request->get('age'),
                'status' => $request->get('status'),
                'sterilized' => $request->get('sterilized'), 
                'breed_id' => $request->get('breed_id'),
                'size_id' => $request->get('size_id'),
                'user_id' => Auth::user()->id,
                'gender' => $request->get('gender'),
                'lat' => $request->get('lat'),
                'lng' => $request->get('lng'),
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
     * @OA\Get(
     *     path="/api/pets/{id}",
     *     tags={"Pets"},
     *     summary="Get a pet by ID",
     *     description="This endpoint retrieves a pet's details based on the given ID.",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the pet to retrieve",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Pet details retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object", ref="#/components/schemas/Pet")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Pet not found",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Pet not found"),
     *             @OA\Property(property="data", type="string", example="Error details")
     *         )
     *     )
     * )
     */
    public function show(string $id)
    {
        try {
            $pet = Pet::with(['images', 'size', 'breed'])->findOrFail($id);
            return response()->json(['data' => $pet, 'is_auth_user' => Auth::check()], 200);
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
                'description' => 'sometimes|required|string|max:255',
                'sterilized' => 'sometimes|required|boolean',
                'status' => 'sometimes|required|string|max:255',
                'location' => 'sometimes|required|string|max:255',
                'breed_id' => 'sometimes|required|exists:breeds,id',
                'size_id' => 'sometimes|required|exists:sizes,id',
                'user_id' => 'sometimes|required|exists:users,id',
                'age'=> 'sometimes|required|integer|max:255',
                'gender'=> 'sometimes|required|string|max:255',
                'tipoMascota'=> 'sometimes|required|string|max:255',
                'tamanioMascota'=> 'sometimes|required|string|max:255',


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
