<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CampaignUpdateRequest extends FilterableRequest
{
    protected $filterableModels = ['adventure'];

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->campaign->users->pluck('id')->contains(Auth::id());
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
            'character_id' => ['nullable', 'integer', 'exists:characters,id']
        ];
    }
}
