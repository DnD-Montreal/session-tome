<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AttachDMEntryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('update', $this->character);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'dm_entry_ids' => ['required', 'array'],
            'dm_entry_ids.*' => ['required', 'integer', 'distinct:strict', 'exists:entries,id'],
        ];
    }
}
