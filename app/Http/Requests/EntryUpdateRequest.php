<?php

namespace App\Http\Requests;

use App\Models\Entry;
use App\Models\Item;
use Illuminate\Foundation\Http\FormRequest;

class EntryUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if (is_null($this->character_id)) {
            return $this->type == Entry::TYPE_DM;
        }
        return $this->user()->can('update', $this->entry->character)  && $this->user()->can('update', $this->entry);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rarities = implode(",", Item::RARITY);
        return [
            'adventure_id' => ['required', 'integer', 'exists:adventures,id'],
            'campaign_id' => ['sometimes', 'integer', 'exists:campaigns,id'],
            'character_id' => ['sometimes', 'integer', 'exists:characters,id'],
            'event_id' => ['sometimes', 'integer', 'exists:events,id'],
            'dungeon_master_id' => ['sometimes', 'integer', 'exists:users,id'],
            'dungeon_master' => ['sometimes', 'string'],
            'date_played' => ['required', 'date'],
            'location' => ['sometimes', 'string'],
            'type' => ['required', 'string'],
            'levels' => ['sometimes', 'integer'],
            'gp' => ['sometimes', 'numeric', 'between:-999999999999999999999999999999.99,999999999999999999999999999999.99'],
            'downtime' => ['sometimes', 'integer'],
            'items' => ['sometimes', 'array'],
            'items.*.name' => ['string', 'required_with:items'],
            'items.*.rarity' => ["in:{$rarities}", 'required_with:items'],
            'items.*.tier' =>  ['integer', 'between:1,4','required_with:items'],
            'choice' => ['sometimes', 'string'],
            'rating_data' => ['nullable', 'array']
        ];
    }
}
