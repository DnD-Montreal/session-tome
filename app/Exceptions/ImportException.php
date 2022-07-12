<?php

namespace App\Exceptions;

use Exception;

class ImportException extends Exception
{
    public function __construct($message = 'Character could not be imported.', $code = 400)
    {
        parent::__construct($message, $code);
    }
}
