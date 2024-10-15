<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use App\Models\PetImage;
use App\Models\Image;

class PetController extends Controller
{
    public function index()
    {
        return Pet::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string',
            'sterilized' => 'required|boolean',
            'location' => 'required|string|max:255',
            'breed_id' => 'required|exists:breeds,id',
            'size_id' => 'required|exists:sizes,id',
            'user_id' => 'required|exists:users,id',
            'images' => 'array',
            'images.*' => 'file|image|max:2048',
        ]);
        $pet = Pet::create($request->all());
        if ($request->has('images')) {
            foreach ($request->file('images') as $file) {
                // Generar un nombre único para la imagen
                $filename = time() . '_' . $file->getClientOriginalName();

                // Guardar la imagen en el directorio 'public/pet_images'
                $filePath = $file->storeAs('public/pet_images', $filename);

                // Registrar la imagen en la tabla 'images'
                $image = Image::create([
                    'filename' => $filename,
                    'path' => $filePath,
                    'mime_type' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                ]);

                // Asociar la imagen con la mascota en la tabla 'pet_images'
                PetImage::create([
                    'pet_id' => $pet->id,
                    'image_id' => $image->id,
                ]);
            }
        }
        return response()->json($pet, 201);
    }

    public function show($id)
    {
        return Pet::find($id);
    }

    public function update(Request $request, $id)
    {
        $pet = Pet::findOrFail($id);
        $pet->update($request->all());
        return response()->json($pet, 200);
    }


    public function destroy($id)
    {
        Pet::destroy($id);
        return response()->json(null, 204);
    }
}
