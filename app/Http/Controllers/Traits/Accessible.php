<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Support\Facades\Auth;

trait Accessible
{
    /**
     * returns a 403 if the user is not an admin
     */
    public function checkIfNotSiteAdmin()
    {
        if (! Auth::user()->isSiteAdmin()) {
            $this->crud->denyAccess(['create', 'show', 'list', 'reorder', 'delete']);
        }
    }
}
