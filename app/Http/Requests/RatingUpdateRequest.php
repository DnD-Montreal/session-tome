<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RatingUpdateRequest extends FormRequest
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
            'entry_id' => ['required', 'integer', 'exists:entries,id'],
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'author_id' => ['required', 'integer', 'exists:authors,id'],
            'score' => ['required', 'string'],
        ];
    }
}
