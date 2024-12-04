<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Illuminate\Http\Exceptions\HttpResponseException;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof AuthorizationException) {
            return response()->json([
                'message' => 'No tienes permiso para realizar esta acción.'
            ], Response::HTTP_FORBIDDEN);
        }

        if ($exception instanceof AccessDeniedHttpException) {
            return response()->json([
                'message' => 'Acceso denegado.'
            ], Response::HTTP_FORBIDDEN);
        }

        if ($exception instanceof HttpResponseException) {
            return response()->json([
                'message' => 'Acceso denegado.',
                'code' => $exception->getCode(),
            ], Response::HTTP_UNAUTHORIZED);
        }

        if ($exception instanceof ValidationException) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $exception->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if ($exception instanceof NotFoundHttpException) {
            return response()->json([
                'message' => 'El recurso solicitado no se ha encontrado'
            ], Response::HTTP_NOT_FOUND);
        }

        if ($exception instanceof ModelNotFoundException) {
            return response()->json([
                'message' => 'El recurso solicitado no se ha encontrado.'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'message' => $exception->getMessage(),
            'code' => $exception->getCode(),
            "type" => get_class($exception),
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
