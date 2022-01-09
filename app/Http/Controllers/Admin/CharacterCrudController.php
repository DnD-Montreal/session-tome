<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CharacterRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class CharacterCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class CharacterCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     *
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Character::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/character');
        CRUD::setEntityNameStrings('character', 'characters');
    }

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::column('user_id');
        CRUD::column('name');
        CRUD::column('race');
        CRUD::column('class');
        CRUD::column('level');
        CRUD::column('faction');
        CRUD::column('downtime');
        CRUD::column('status');
        CRUD::column('character_sheet');
        CRUD::column('background');

        /**
         * Columns can be defined using the fluent syntax or array syntax:
         * - CRUD::column('price')->type('number');
         * - CRUD::addColumn(['name' => 'price', 'type' => 'number']);
         */
    }

    /**
     * Define what happens when the Create operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(CharacterRequest::class);

        CRUD::field('user_id');
        CRUD::field('name');
        CRUD::field('race');
        CRUD::field('class');
        CRUD::field('level');
        CRUD::field('faction');
        CRUD::field('downtime');
        CRUD::field('status');
        CRUD::field('character_sheet');
        CRUD::field('background');
        CRUD::field('items');
        CRUD::field('campaigns');
        CRUD::field('entries');
        CRUD::addField([
            'name' => 'sessions',
            'type' => 'relationship',
            'attribute' => "display_title",
            'label' => "Event Inscriptions"
        ]);

        /**
         * Fields can be defined using the fluent syntax or array syntax:
         * - CRUD::field('price')->type('number');
         * - CRUD::addField(['name' => 'price', 'type' => 'number']));
         */
    }

    /**
     * Define what happens when the Update operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
