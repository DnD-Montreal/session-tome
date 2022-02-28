<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SessionUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'event_id' => ['required', 'integer', 'exists:events,id'],
            'adventure_id' => ['required', 'integer', 'exists:adventures,id'],
            'dungeon_master_id' => ['required', 'integer', 'exists:users,id'],
            'table' => ['required', 'string'],
            'start_time' => ['required'],
            'end_time' => ['required'],
        ];
    }
}
