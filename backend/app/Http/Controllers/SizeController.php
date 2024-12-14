<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Size;
use Exception;
use Illuminate\Validation\ValidationException;

class SizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sizes = Size::all();
        return response()->json($sizes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|unique:sizes|max:255',
            ]);

            $size = new Size();
            $size->name = $request->name;
            $size->save();

            return response()->json($size, 201);
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
        $size = Size::findOrFail($id);
        return response()->json($size);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|unique:sizes,name,' . $id . '|max:255',
        ]);

        $size = Size::findOrFail($id);
        $size->name = $request->name;
        $size->save();

        return response()->json($size);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $size = Size::findOrFail($id);
        $size->delete();

        return response()->json(null, 204);
    }
}
