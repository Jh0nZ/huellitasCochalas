<?php

namespace App\Http\Controllers;

use App\Models\AdoptionRequest;
use Illuminate\Http\Request;

class AdoptionRequestController extends Controller
{
    public function index()
    {
        // Retorna todas las solicitudes de adopción
        return AdoptionRequest::all();
    }

    public function store(Request $request)
    {
        // Crea una nueva solicitud de adopción
        $adoptionRequest = AdoptionRequest::create($request->all());
        return response()->json($adoptionRequest, 201);
    }

    public function show($id)
    {
        // Retorna una solicitud de adopción específica
        return AdoptionRequest::find($id);
    }

    public function update(Request $request, $id)
    {
        // Actualiza una solicitud de adopción
        $adoptionRequest = AdoptionRequest::findOrFail($id);
        $adoptionRequest->update($request->all());
        return response()->json($adoptionRequest, 200);
    }

    public function destroy($id)
    {
        // Elimina una solicitud de adopción
        AdoptionRequest::destroy($id);
        return response()->json(null, 204);
    }
}
