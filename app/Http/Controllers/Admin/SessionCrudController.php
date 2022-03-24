<?php

namespace App\Http\Controllers\Admin;

use App\Models\Event;
use App\Http\Requests\SessionRequest;
use App\Models\Session;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Illuminate\Support\Facades\Auth;

/**
 * Class SessionCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class SessionCrudController extends CrudController
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
        CRUD::setModel(\App\Models\Session::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/session');
        CRUD::setEntityNameStrings('session', 'sessions');

        $this->leagueId = Auth::user()->roles()->pluck('league_id');
        $this->eventId = Event::whereIn('league_id', $this->leagueId)->pluck('id');
    }

    private $leagueId;
    private $eventId;

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        if (!Auth::user()->isSiteAdmin()) {
            /** @psalm-suppress UndefinedFunction */
            $this->crud->addClause('whereIn', 'event_id', $this->eventId);

            if ($this->eventId->count() == 0) {
                $this->crud->removeButton('create');
            }
        }

        CRUD::column('event_id');
        CRUD::column('adventure_id');
        CRUD::column('dungeonMaster');
        CRUD::column('table');
        CRUD::column('start_time');
        CRUD::column('end_time');
    }

    /**
     * Checks to see if a session is accessible as a league admin
     * @return void
     */
    protected function checkIfAccessible(String $crudAction)
    {
        if (!Auth::user()->isSiteAdmin()) {
            $session = Session::whereIn('event_id', $this->eventId)->pluck('id')->toArray();
            $id = $this->crud->getCurrentEntryId();
            if (!in_array($id, $session)) {
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
        CRUD::setValidation(SessionRequest::class);

        if (!Auth::user()->isSiteAdmin()) {
            if ($this->eventId->count() == 0) {
                $this->crud->denyAccess('create');
            }
            CRUD::addField([
                'label' => 'Event',
                'type' => 'select',
                'name' => 'event_id',
                'options' => (function ($query) {
                    $query->whereIn('id', $this->eventId);
                    return $query->get();
                }),
            ]);
        }

        CRUD::field('event_id');
        CRUD::field('adventure_id');
        CRUD::field('dungeonMaster');
        CRUD::field('table');
        CRUD::field('start_time');
        CRUD::field('end_time');
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
     *
     */
    public function destroy($id)
    {
        $this->checkIfAccessible('delete');
        $this->crud->hasAccessOrFail('delete');
        return $this->crud->delete($id);
    }
}
