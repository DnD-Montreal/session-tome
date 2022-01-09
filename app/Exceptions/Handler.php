<?php

namespace App\Exceptions;

use Closure;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    protected $titles = [
        503 => '503: Service Unavailable',
        500 => '500: Server Error',
        401 => '401: Unauthorized',
        404 => '404: Page Not Found',
        403 => '403: Forbidden',
    ];

    protected $descriptions = [
        503 => 'Sorry, we are doing some maintenance. Please check back soon.',
        500 => 'Whoops, something went wrong on our servers.',
        401 => 'Sorry, you\'re not allowed to see that.',
        404 => 'Sorry, the page you are looking for could not be found.',
        403 => 'Sorry, you are forbidden from accessing this page.',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Prepare exception for rendering.
     *
     * @param \Illuminate\Http\Request  $request
     * @param \Throwable $e
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response|object|\Symfony\Component\HttpFoundation\Response|Throwable
     * @throws Throwable
     */
    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);

        if (config("app.debug") && !app()->environment(['local', 'testing'])) {
            dump($e->getTraceAsString());
        }

        if (!app()->environment(['local', 'testing']) && in_array($response->status(), array_keys($this->titles))) {
            return $this->renderError($request, $response, null, $e->getMessage(), $e->getCode());
        } elseif ($response->status() === 419) {
            return back()->with([
                'message' => 'The page expired, please try again.',
            ]);
        } elseif (isset($response->getOriginalContent()['errors'])) {
            return $this->renderError($request, $response, "{$response->status()}: Error", $response->getOriginalContent()['errors'], $e->getCode());
        }

        return $response;
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param $response
     * @param null $title
     * @param null $description
     * @param null $status
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response|object|\Symfony\Component\HttpFoundation\Response
     */
    protected function renderError($request, $response, $title = null, $description = null, $status = null)
    {
        $title = $title ?? $this->titles[$status ?? $response->status()];
        $description = $description ?? $this->descriptions[$status ?? $response->status()];
        return Inertia::render('Error', ['title' => $title, 'description' => $description])
            ->toResponse($request)
            ->setStatusCode($status ?? $response->status());
    }
}
