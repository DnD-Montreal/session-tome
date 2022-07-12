<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FilterableRequest extends FormRequest
{
    protected $filterableModels = [];

    protected function prepareForValidation()
    {
        foreach ($this->filterableModels as $model) {
            $modelData = $this->get($model);
            if ($modelData && is_array($modelData)) {
                $this->merge([
                    "{$model}_id" => $modelData['id'],
                    $model => null,
                ]);
            }
        }
    }
}
