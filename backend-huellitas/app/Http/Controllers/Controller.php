<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;


/**
 * @OA\Info(
 *     title="Huellitas API",
 *     version="1.0.0",
 *     description="API for managing pet adoption.",
 *     @OA\Contact(
 *         name="Support",
 *         email="support@huellitas.com"
 *     )
 * )
 */
class Controller extends BaseController
{

    use AuthorizesRequests, ValidatesRequests;
}
