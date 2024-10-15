<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;

class PetController extends Controller
{
    public function index()
    {
        return Pet::all();
    }

    public function store(Request $request)
    {
        $pet = Pet::create($request->all());
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
