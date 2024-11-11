<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Authenticate extends Middleware
{

    protected function redirectTo(Request $request): ?string
    {
        return null;
    }
    protected function unauthenticated($request, array $guards)
    {
        abort(response()->json([
            'message' => 'Unauthorized'
        ], Response::HTTP_UNAUTHORIZED));
    }
}
