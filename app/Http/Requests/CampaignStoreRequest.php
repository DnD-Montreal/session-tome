<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CampaignStoreRequest extends FormRequest
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
            'adventure.id' => ['required', 'integer', 'exists:adventures,id'],
            'title' => ['required', 'string'],
            'character_id' => ['sometimes', 'exists:characters,id'],
        ];
    }
}
