<?php

namespace App\Http\Requests;

use App\Models\Character;
use App\Models\Entry;
use App\Models\Item;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class EntryStoreRequest extends FilterableRequest
{
    protected $filterableModels = [
        'campaign',
        'adventure',
        'dungeon_master',
    ];

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if (is_null($this->character_id)) {
            return $this->type == Entry::TYPE_DM && $this->user_id == Auth::id();
        }
        $character = Character::findOrFail($this->character_id);
        return $this->user()->can('update', $character);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rarities = implode(",", Item::RARITY);
        $requiredIf = Rule::requiredIf(!empty($this->get('items')) || ($this->get('choice') == "magic_item"));
        $requiredChoice = Rule::requiredIf($this->get('choice') == "magic_item" && empty($this->get('items')));

        return [
            'user_id' => ['sometimes', 'integer', 'exists:users,id'],
            'adventure_id' => ['required', 'integer', 'exists:adventures,id'],
            'campaign_id' => ['sometimes', 'integer', 'exists:campaigns,id'],
            'character_id' => ['sometimes', 'nullable', 'integer', 'exists:characters,id'],
            'event_id' => ['sometimes', 'integer', 'exists:events,id'],
            'dungeon_master_id' => ['sometimes', 'integer', 'exists:users,id'],
            'dungeon_master' => ['sometimes'],
            'date_played' => ['required', 'date'],
            'location' => ['nullable', 'string'],
            'type' => ['required', 'string'],
            'length' => ['sometimes', 'integer'],
            'levels' => ['sometimes', 'integer'],
            'gp' => ['sometimes', 'numeric', 'between:-999999999999999999999999999999.99,999999999999999999999999999999.99'],
            'downtime' => ['sometimes', 'integer'],
            'notes' => ['nullable', 'string'],
            'items' => ['sometimes', 'array', $requiredChoice],
            'items.*.name' => ['string', $requiredIf],
            'items.*.rarity' => ["in:{$rarities}", $requiredIf],
            'items.*.tier' =>  ['integer', 'between:1,4',$requiredIf],
            'choice' => ['sometimes', 'nullable', 'string'],
            'rating_data' => ['nullable', 'array'],
        ];
    }
}
