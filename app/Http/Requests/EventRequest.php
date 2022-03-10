<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use App\Models\Event;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class EventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //if user is a site admin they can update/create any session
        if ($this->user()->isSiteAdmin()) {
            return true;
        }

        // if user is a league admin verify that they can create/update the event
        if ($this->user()->isLeagueAdminWithLeagueId()) {
            $leagueIdRequest = request()->input('league_id');
            $leagueId = Auth::user()->roles()->pluck('league_id')->toarray();
            if (!in_array($leagueIdRequest, $leagueId)) {
                abort(403);
            }
            return true;
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            // 'name' => 'required|min:5|max:255'
        ];
    }

    /**
     * Get the validation attributes that apply to the request.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            //
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array
     */
    public function messages()
    {
        return [
            //
        ];
    }
}
