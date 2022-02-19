<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TradeFulfillRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //dd($this->trade);
        //dd($this->user()->can('update', $this->trade));
        return $this->user()->can('update', $this->trade);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'character_id' => ['required', 'integer', 'exists:characters,id'],
            'offered_item_id' => ['required', 'integer', 'exists:items,id'],
        ];
    }
}
