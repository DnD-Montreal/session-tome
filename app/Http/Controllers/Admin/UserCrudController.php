<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Traits\Accessible;
use App\Http\Requests\UserRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class UserCrudController
 *
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class UserCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation { store as traitStore; }
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation { update as traitUpdate; }
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
        CRUD::setModel(\App\Models\User::class);
        CRUD::setRoute(config('backpack.base.route_prefix').'/user');
        CRUD::setEntityNameStrings('user', 'users');
        $this->crud->denyAccess('create');
    }

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     *
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::addButtonFromView('top', 'rating_report', 'rating_report', 'end');

        CRUD::column('name');
        CRUD::column('email');
        CRUD::column('roles');
        CRUD::field('leagues');
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
        CRUD::setValidation(UserRequest::class);

        CRUD::field('name');
        CRUD::field('email');
//        CRUD::field('roles');
        CRUD::field('roles_list')
            ->type('repeatable')
            ->label('Roles')
            ->fields([
                [
                    'name' => 'role_id',
                    'type' => 'select2',
                    'model' => 'App\Models\Role',
                    'attribute' => 'name',
                ],
                [
                    'name' => 'league_id',
                    'type' => 'select2',
                    'model' => 'App\Models\League',
                    'attribute' => 'name',
                ],
            ]);
        CRUD::field('leagues');
        CRUD::field('characters');
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
        $this->setupCreateOperation();
    }

    public function store()
    {
        $roles = collect(json_decode(request('roles_list'), true));

        $response = $this->traitStore();

        $this->crud->entry->roles()->sync($roles);

        return $response;
    }

    public function update()
    {
        $roles = collect(json_decode(request('roles_list'), true));

        $response = $this->traitUpdate();

        $this->crud->entry->roles()->sync($roles);

        return $response;
    }
}
