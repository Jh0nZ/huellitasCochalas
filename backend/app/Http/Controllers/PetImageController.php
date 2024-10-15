<?php

namespace App\Http\Controllers;

use App\Models\PetImage;
use Illuminate\Http\Request;

class PetImageController extends Controller
{
    // Listar todas las imágenes de mascotas
    public function index()
    {
        $petImages = PetImage::all();
        return response()->json($petImages, 200);
    }

    // Subir una nueva imagen para una mascota
    public function store(Request $request)
    {
        // Validar los datos recibidos
        $validatedData = $request->validate([
            'pet_id' => 'required|exists:pets,id',
            'image_path' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Guardar la imagen en el almacenamiento y obtener la ruta
        $path = $request->file('image_path')->store('pet_images', 'public');

        // Crear una nueva entrada en la base de datos
        $petImage = new PetImage();
        $petImage->pet_id = $validatedData['pet_id'];
        $petImage->image_path = $path;
        $petImage->save();

        return response()->json($petImage, 201);
    }

    // Mostrar una imagen específica de una mascota
    public function show($id)
    {
        $petImage = PetImage::findOrFail($id);
        return response()->json($petImage, 200);
    }

    // Actualizar una imagen de mascota
    public function update(Request $request, $id)
    {
        $petImage = PetImage::findOrFail($id);

        // Validar nueva imagen si es proporcionada
        if ($request->hasFile('image_path')) {
            $path = $request->file('image_path')->store('pet_images', 'public');
            $petImage->image_path = $path;
        }

        $petImage->save();

        return response()->json($petImage, 200);
    }

    // Eliminar una imagen de mascota
    public function destroy($id)
    {
        $petImage = PetImage::findOrFail($id);

        // Eliminar la imagen del almacenamiento
        if (\Storage::disk('public')->exists($petImage->image_path)) {
            \Storage::disk('public')->delete($petImage->image_path);
        }

        // Eliminar el registro de la base de datos
        $petImage->delete();

        return response()->json(null, 204);
    }
}
