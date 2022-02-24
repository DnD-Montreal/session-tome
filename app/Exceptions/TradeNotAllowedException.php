<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class TradeNotAllowedException extends Exception
{
    public function __construct($message = "User does not have permission to modify this trade.", $code = 403, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
