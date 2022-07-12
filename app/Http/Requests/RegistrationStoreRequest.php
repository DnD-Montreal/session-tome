<?php

namespace App\Http\Requests;

use App\Models\Character;
use Illuminate\Foundation\Http\FormRequest;

class RegistrationStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $character = Character::findOrFail($this->get('character_id'));

        return $this->user()->can('update', $character);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'session_id' => 'sometimes|exists:sessions,id',
            'character_id' => 'required|exists:characters,id',
            'event_id' => 'required_without:session_id|exists:events,id',
        ];
    }
}
