<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class TradeClosedException extends Exception
{
    public function __construct($message = 'The trade you are attempting to fulfill is closed.', $code = 400, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
