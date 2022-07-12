<?php

namespace App\Exceptions;

use Exception;

class GMEntryException extends Exception
{
    public function __construct($message = 'GM Entry Exception', $code = 400)
    {
        parent::__construct($message, $code);
    }
}
