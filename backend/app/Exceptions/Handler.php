<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    // A lista de las excepciones que se ignorarán.
    protected $dontReport = [];

    // A lista de entradas de entrada que se ocultarán.
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    public function render($request, Throwable $exception)
    {
        // Manejo personalizado para respuestas JSON
        if ($request->expectsJson()) {
            // Maneja excepciones de validación
            if ($exception instanceof \Illuminate\Validation\ValidationException) {
                return response()->json([
                    'error' => $exception->getMessage(),
                    'errors' => $exception->errors(),
                ], 422);
            }

            // Maneja excepciones de modelo no encontrado
            if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
                return response()->json(['error' => 'Recurso no encontrado'], 404);
            }

            // Maneja otras excepciones aquí
            return response()->json(['error' => $exception->getMessage()], 400);
        }

        return parent::render($request, $exception);
    }
}
