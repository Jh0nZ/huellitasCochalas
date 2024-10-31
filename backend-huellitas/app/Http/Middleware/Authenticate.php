<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        return null;
    }
    
    protected function unauthenticated($request, array $guards)
    {
        // Si la solicitud espera JSON, devolver una respuesta JSON en lugar de redireccionar
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
