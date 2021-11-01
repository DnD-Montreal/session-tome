<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CharacterUpdateRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'race' => ['required', 'string'],
            'class' => ['required', 'string'],
            'level' => ['required', 'digits_between:1,20'],
            'faction' => ['nullable', 'string'],
            'downtime' => ['required', 'integer'],
            'status' => ['required', 'string'],
        ];
    }
}
