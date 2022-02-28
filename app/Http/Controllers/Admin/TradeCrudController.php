<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\TradeRequest;
use App\Http\Controllers\Traits\Accessible;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class TradeCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class TradeCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;
    use Accessible;
    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     *
     * @return void
     */
    public function setup()
    {
        $this->checkIfNotSiteAdmin();
        CRUD::setModel(\App\Models\Trade::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/trade');
        CRUD::setEntityNameStrings('trade', 'trades');
    }

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::column('item_id');
        CRUD::column('character_id');
        CRUD::column('requested_items');
        CRUD::column('description');
        CRUD::column('status');
    }

    /**
     * Define what happens when the Create operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(TradeRequest::class);

        CRUD::field('item_id');
        CRUD::field('character_id');
        CRUD::field('requested_items');
        CRUD::field('description');
        CRUD::field('status');
        CRUD::addField([
            'name' => "items",
            'label' => "Trade Offers"
        ]);
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
