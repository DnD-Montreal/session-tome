<?php

namespace App\Http\Requests;

use App\Models\Character;
use Illuminate\Foundation\Http\FormRequest;

class BulkEntryStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $character = Character::findOrFail($this->character_id);
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
            'character_id' => "required|exists:characters,id",
            'adventure_id' => "required|exists:adventures,id",
            'start_date' => "required|date",
            'end_date' => "nullable|date|after:start_date",
            // How often a session was ran, measured in times/week
            // (1 -> once per week, 2 -> twice per week, 0.5 -> once every 2 weeks)
            'frequency' => "required|numeric",
        ];
    }

    protected function prepareForValidation()
    {
        if ($adventure = $this->get('adventure')) {
            $this->merge([
                'adventure_id' => $adventure['id']
            ]);
        }
    }
}
