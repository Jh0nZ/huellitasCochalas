<?php

namespace App\Http\Controllers;

use App\Models\AdoptionRequestImage;
use Illuminate\Http\Request;

class AdoptionRequestImageController extends Controller
{
    // Listar todas las imágenes de solicitudes de adopción
    public function index()
    {
        return AdoptionRequestImage::all();
    }

    // Subir una nueva imagen para una solicitud de adopción
    public function store(Request $request)
    {
        // Validar los datos recibidos
        $validatedData = $request->validate([
            'adoption_request_id' => 'required|exists:adoption_requests,id',
            'image_path' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Guardar la imagen en el almacenamiento y obtener la ruta
        $path = $request->file('image_path')->store('adoption_images', 'public');

        // Crear una nueva entrada en la base de datos
        $adoptionRequestImage = new AdoptionRequestImage();
        $adoptionRequestImage->adoption_request_id = $validatedData['adoption_request_id'];
        $adoptionRequestImage->image_path = $path;
        $adoptionRequestImage->save();

        return response()->json($adoptionRequestImage, 201);
    }

    // Mostrar una imagen específica de una solicitud de adopción
    public function show($id)
    {
        return AdoptionRequestImage::findOrFail($id);
    }

    // Actualizar una imagen de solicitud de adopción (si es necesario)
    public function update(Request $request, $id)
    {
        $adoptionRequestImage = AdoptionRequestImage::findOrFail($id);

        // Validar nueva imagen si es proporcionada
        if ($request->hasFile('image_path')) {
            $path = $request->file('image_path')->store('adoption_images', 'public');
            $adoptionRequestImage->image_path = $path;
        }

        $adoptionRequestImage->save();

        return response()->json($adoptionRequestImage, 200);
    }

    // Eliminar una imagen de una solicitud de adopción
    public function destroy($id)
    {
        $adoptionRequestImage = AdoptionRequestImage::findOrFail($id);

        // Eliminar la imagen del almacenamiento
        if (\Storage::disk('public')->exists($adoptionRequestImage->image_path)) {
            \Storage::disk('public')->delete($adoptionRequestImage->image_path);
        }

        // Eliminar el registro de la base de datos
        $adoptionRequestImage->delete();

        return response()->json(null, 204);
    }
}
