<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ItemUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->item);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'entry_id' => ['required', 'integer', 'exists:entries,id'],
            'character_id' => ['required', 'integer', 'exists:characters,id'],
            'name' => ['required', 'string'],
            'rarity' => ['required', 'in:common,uncommon,rare,very_rare,legendary'],
            'tier' => ['required', 'string'],
            'description' => ['required', 'string'],
            'counted' => ['required', 'string'],
        ];
    }
}
