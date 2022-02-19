<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\Auth;

trait Accessible
{
    /**
     * returns a 403 if the user is not an admin
     *
     * @return abort
     */
    public function isNotSiteAdmin()
    {
        if (!Auth::user()->isSiteAdmin()) {
            return abort(403);
        }
    }
}
