<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\AdoptionRequest;
use App\Models\AdoptionRequestImage;
use App\Models\Image;

class AdoptionRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = AdoptionRequest::with(['user.images', 'pet']);

        if ($request->has('pet_id')) {
            $query->where('pet_id', $request->pet_id);
        }

        $requests = $query->get();

        return response()->json([
            'mensaje' => 'Solicitudes de adopción recuperadas con éxito',
            'adoption_requests' => $requests
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'status' => 'required|string|max:255',
            'additional_notes' => 'nullable|string',
            'phone' => 'required|string|max:15',
            'location' => 'required|string|max:255',
            'pet_id' => 'required|exists:pets,id',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        $adoptionRequest = new AdoptionRequest([
            'user_id' => Auth::id(),
            'status' => $request->status,
            'additional_notes' => $request->additional_notes,
            'phone' => $request->phone,
            'location' => $request->location,
            'pet_id' => $request->pet_id,
            'lat' => $request->lat,
            'lng' => $request->lng,
        ]);

        $adoptionRequest->save();

        // Guardar imágenes asociadas a la solicitud
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('adoption-images', 'public');
                $image = Image::create([
                    'filename' => $file->getClientOriginalName(),
                    'path' => $path,
                    'mime_type' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                ]);

                // Asociar la imagen a la solicitud de adopción
                AdoptionRequestImage::create([
                    'adoption_request_id' => $adoptionRequest->id,
                    'image_id' => $image->id,
                ]);
            }
        }
        $adoptionRequest->load('images');

        return response()->json([
            'mensaje' => 'Solicitud de adopción creada con éxito',
            'adoptionRequest' => $adoptionRequest,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Buscar la solicitud de adopción con las imágenes relacionadas
        $adoptionRequest = AdoptionRequest::with('images')->findOrFail($id);

        return response()->json([
            'message' => 'Adoption request retrieved successfully',
            'adoptionRequest' => $adoptionRequest,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'sometimes|required|string|max:255',
            'additional_notes' => 'sometimes|nullable|string',
            'phone' => 'sometimes|required|string|max:15',
            'location' => 'sometimes|required|string|max:255',
        ]);

        // Buscar la solicitud de adopción
        $adoptionRequest = AdoptionRequest::findOrFail($id);

        // if ($adoptionRequest->pet->user_id !== Auth::id()) {
        //     return response()->json([
        //         'mensaje' => 'No tienes permiso para actualizar esta solicitud de adopción.',
        //     ], 403);
        // }

        $adoptionRequest->fill($request->only([
            'status',
            'additional_notes',
            'phone',
            'location',
        ]));

        $adoptionRequest->save();

        $adoptionRequest->load('images');

        return response()->json([
            'mensaje' => 'Solicitud de adopción actualizada con éxito',
            'adoptionRequest' => $adoptionRequest,
        ], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
