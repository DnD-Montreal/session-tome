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
 *
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
        CRUD::setRoute(config('backpack.base.route_prefix').'/event');
        CRUD::setEntityNameStrings('event', 'events');

        $this->leagueId = Auth::user()->roles()->pluck('league_id');
        $this->eventId = Event::whereIn('league_id', $this->leagueId)->pluck('id');
    }

    private $leagueId;

    private $eventId;

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     *
     * @return void
     */
    protected function setupListOperation()
    {
        if (! Auth::user()->isSiteAdmin()) {
            /** @psalm-suppress UndefinedFunction */
            $this->crud->addClause('whereIn', 'id', $this->eventId);
        }

        $this->crud->addButtonFromView('line', 'event_report', 'event_report', 'beginning');
        CRUD::column('league_id');
        CRUD::column('title');
        CRUD::column('description');
        CRUD::column('location');
        CRUD::addColumn([
            'name' => 'sessions',
            'type' => 'relationship',
            'attribute' => 'table_title',
            'label' => 'Tables',
        ]);
    }

    /**
     * Checks to see if an event is accessible as a league admin
     *
     * @return void
     */
    protected function checkIfAccessible(string $crudAction)
    {
        if (! Auth::user()->isSiteAdmin()) {
            $id = $this->crud->getCurrentEntryId();
            if (! in_array($id, $this->eventId->toarray())) {
                $this->crud->denyAccess($crudAction);
            }
        }
    }

    /**
     * Define what happens when the Create operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     *
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(EventRequest::class);

        if (! Auth::user()->isSiteAdmin()) {
            CRUD::addField([
                'label' => 'League',
                'type' => 'select',
                'name' => 'league_id',
                'options' => (function ($query) {
                    $query->whereIn('id', $this->leagueId);

                    return $query->get();
                }),
            ]);
        }

        CRUD::field('league_id');
        CRUD::field('title');
        CRUD::field('description');
        CRUD::field('location');
    }

    /**
     * Define what happens when the show operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-show
     *
     * @return void
     */
    protected function setupShowOperation()
    {
        $this->autoSetupShowOperation();
        $this->checkIfAccessible('show');
        $this->setupListOperation();
    }

    /**
     * Define what happens when the Update operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     *
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
     *
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
