<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    /**
     * @OA\Info(
     *      version="0.0.1",
     *      title="Session Tome API Documentation",
     *      description="Session Tome API description",
     *      @OA\Contact(
     *          email="massimo@dndmtl.com"
     *      ),
     *      @OA\License(
     *          name="MIT License",
     *          url="https://opensource.org/licenses/MIT"
     *      )
     * )
     *
     * @OA\Server(
     *      url=L5_SWAGGER_CONST_HOST,
     *      description=""
     * )

     *
     * @OA\Tag(
     *     name="Session Tome",
     *     description="API Endpoints of Session Tome"
     * )
     */
    use AuthorizesRequests;
    use DispatchesJobs;
    use ValidatesRequests;
}
