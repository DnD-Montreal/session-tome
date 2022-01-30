<?php

namespace App\Http\Requests;

use App\Models\Item;
use Illuminate\Foundation\Http\FormRequest;

class ItemStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('create', Item::class);
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
            'character_id' => ['required', 'integer', 'exists:characters,id'],
            'name' => ['required', 'string'],
            'rarity' => ['required', 'in:common,uncommon,rare,very_rare,legendary'],
            'tier' => ['required', 'integer'],
            'description' => ['required', 'string'],
            'author_id' => ['required', 'integer', 'exists:users,id'],
        ];
    }
}
