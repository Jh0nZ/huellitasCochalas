<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ImageController extends Controller
{
    public function index()
    {
        $images = Image::all();
        return response()->json($images, Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        try {
            $image = $request->file('image');
            $path = $image->store('images', 'public');

            $imageModel = new Image();
            $imageModel->filename = $image->getClientOriginalName();
            $imageModel->path = $path;
            $imageModel->mime_type = $image->getClientMimeType();
            $imageModel->size = $image->getSize();
            $imageModel->save();

            return response()->json(['success' => 'Image uploaded successfully.'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Image upload failed.', 'message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        $image = Image::findOrFail($id);
        return response()->json($image, Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $image = Image::findOrFail($id);
        Storage::disk('public')->delete($image->path);
        $image->delete();

        return response()->json(['success' => 'Image deleted successfully.'], Response::HTTP_OK);
    }
}
