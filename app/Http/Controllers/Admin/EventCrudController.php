<?php

namespace App\Http\Controllers\Admin;

use App\Actions\GenerateEventReport;
use App\Http\Requests\EventRequest;
use App\Models\Event;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Illuminate\Support\Facades\Auth;

/**
 * Class EventCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class EventCrudController extends CrudController
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
        CRUD::setModel(\App\Models\Event::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/event');
        CRUD::setEntityNameStrings('event', 'events');
    }

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */

    protected function setupListOperation()
    {
        if (!Auth::user()->isSiteAdmin()) {
            $leagueId = Auth::user()->roles()->pluck('league_id');
            $event = Event::whereIn('league_id', $leagueId)->pluck('id');

            /** @psalm-suppress UndefinedFunction */
            $this->crud->addClause('whereIn', 'id', $event);
        }

        $this->crud->addButtonFromView('line', 'event_report', 'event_report', 'beginning');
        CRUD::column('league_id');
        CRUD::column('title');
        CRUD::column('description');
        CRUD::column('location');
    }

    /**
     * Checks to see if an event is accessible as a league admin
     * @return void
     */
    protected function checkIfAccessible(String $crudAction)
    {
        if (!Auth::user()->isSiteAdmin()) {
            $leagueId = Auth::user()->roles()->pluck('league_id');
            $event = Event::whereIn('league_id', $leagueId)->pluck('id')->toArray();
            $id = $this->crud->getCurrentEntryId();
            if (!in_array($id, $event)) {
                $this->crud->denyAccess($crudAction);
            }
        }
    }

    /**
     * Define what happens when the Create operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        if (!Auth::user()->isSiteAdmin()) {
            CRUD::addField([
                'label' => 'League',
                'type' => 'select',
                'name' => 'league_id',
                'options' => (function ($query) {
                    $leagueId = Auth::user()->roles()->pluck('league_id');
                    $query->whereIn('id', $leagueId);
                    return $query->get();
                }),
            ]);
        }

        CRUD::setValidation(EventRequest::class);
        CRUD::field('league_id');
        CRUD::field('title');
        CRUD::field('description');
        CRUD::field('location');
        CRUD::addField([
            'name' => 'sessions',
            'type' => 'relationship',
            'attribute' => "table_title",
            'label' => "Tables",
        ]);
    }

    /**
     * Define what happens when the show operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-show
     * @return void
     */
    protected function setupShowOperation()
    {
        $this->checkIfAccessible('show');
        $this->setupListOperation();
    }

    /**
     * Define what happens when the Update operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->checkIfAccessible('update');
        $this->setupCreateOperation();
    }

    /**
     * Define what happens when the delete operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-delete
     * @return void
     */
    public function destroy($id)
    {
        $this->checkIfAccessible('delete');
        $this->crud->hasAccessOrFail('delete');
        return $this->crud->delete($id);
    }

    public function report()
    {
        $event = $this->crud->getCurrentEntry(); //gets the current backpack crud entry (NOT our entry model)
        return GenerateEventReport::run($event);
    }
}
