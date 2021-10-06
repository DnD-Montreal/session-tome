<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CharacterStoreRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'race' => ['required', 'string'],
            'class' => ['required', 'string'],
            'level' => ['required', 'digits_between:1,20'],
            'faction' => ['required', 'string'],
            'downtime' => ['required', 'integer'],
            'status' => ['required', 'string'],
        ];
    }
}
