<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\EntryRequest;
use App\Http\Controllers\Traits\Accessible;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class EntryCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class EntryCrudController extends CrudController
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
        $this->isNotSiteAdmin();
        CRUD::setModel(\App\Models\Entry::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/entry');
        CRUD::setEntityNameStrings('entry', 'entries');
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
        CRUD::column('adventure_id');
        CRUD::column('campaign_id');
        CRUD::column('character_id');
        CRUD::column('event_id');
        CRUD::column('dungeon_master_id');
        CRUD::column('dungeon_master');
        CRUD::column('date_played');
        CRUD::column('location');
        CRUD::column('type');
        CRUD::column('levels');
        CRUD::column('gp');
        CRUD::column('notes');
        CRUD::column('downtime');
    }

    /**
     * Define what happens when the Create operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(EntryRequest::class);

        CRUD::field('user_id');
        CRUD::field('adventure_id');
        CRUD::field('campaign_id');
        CRUD::field('character_id');
        CRUD::field('event_id');
        CRUD::field('dungeon_master_id');
        CRUD::field('dungeon_master');
        CRUD::field('date_played');
        CRUD::field('location');
        CRUD::field('type');
        CRUD::field('levels');
        CRUD::field('gp');
        CRUD::field('notes');
        CRUD::field('downtime');
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
