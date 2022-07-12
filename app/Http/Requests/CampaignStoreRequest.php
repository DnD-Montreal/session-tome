<?php

namespace App\Http\Requests;

class CampaignStoreRequest extends FilterableRequest
{
    protected $filterableModels = ['adventure'];

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
            'adventure_id' => ['required', 'integer', 'exists:adventures,id'],
            'title' => ['required', 'string'],
            'character_id' => ['nullable', 'integer', 'exists:characters,id'],
        ];
    }
}
