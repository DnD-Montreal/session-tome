<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EntryStoreRequest extends FormRequest
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
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'adventure_id' => ['required', 'integer', 'exists:adventures,id'],
            'campaign_id' => ['required', 'integer', 'exists:campaigns,id'],
            'character_id' => ['required', 'integer', 'exists:characters,id'],
            'event_id' => ['required', 'integer', 'exists:events,id'],
            'dungeon_master_id' => ['required', 'integer', 'exists:dungeon_masters,id'],
            'dungeon_master' => ['required', 'string'],
            'date_played' => ['required'],
            'location' => ['required', 'string'],
            'type' => ['required', 'string'],
            'levels' => ['required', 'string'],
            'gp' => ['required', 'numeric', 'between:-999999999999999999999999999999.99,999999999999999999999999999999.99'],
        ];
    }
}
