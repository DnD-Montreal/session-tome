<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    /**
     * Limits and filters adventures by title / code
     *
     * @param  Builder  $q
     * @param  string  $search
     * @return Builder
     */
    public function scopeFiltered($q, $search = '')
    {
        foreach ($this->getFilteredFields() as $i => $field) {
            $where = $i ? 'orWhere' : 'where';
            $q->$where($field, 'like', "%{$search}%");
        }

        return $q->limit($this->getLimitValue());
    }

    /**
     * Get list of filterable feilds
     *
     * @return array
     */
    private function getFilteredFields()
    {
        return property_exists(self::class, 'filterableFields') ? $this->filterableFields : [];
    }

    /**
     * Get value to limit filter results to.
     *
     * @return int
     */
    private function getLimitValue()
    {
        return property_exists(self::class, 'filterableLimit') ? $this->filterableLimit : 50;
    }
}
