<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdventureStoreRequest;
use App\Http\Requests\AdventureUpdateRequest;
use App\Models\Adventure;
use Illuminate\Http\Request;

class AdventureController extends Controller
{
    /**
     * @OA\Get(
     *     path="/adventure",
     *     description="Adventure Index",
     *     @OA\Response(response="default", description="Adventure Index")
     * )
     */
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $adventures = Adventure::all();

        return view('adventure.index', compact('adventures'));
    }

    /**
     * @OA\Get(
     *     path="/adventure/create",
     *     description="Adventure Create",
     *     @OA\Response(response="default", description="Adventure Post")
     * )
     */
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('adventure.create');
    }

    /**
     * @OA\Post(
     *     path="/adventure",
     *     description="Adventure Post",
     *     @OA\Parameter(
     *          name="id",
     *          description="Adventure id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *     @OA\Parameter(
     *          name="title",
     *          description="Adventure title",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *     @OA\Parameter(
     *          name="code",
     *          description="Adventure code",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *     @OA\Parameter(
     *          name="description",
     *          description="Adventure description",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *     @OA\Response(response="default", description="Adventure Post")
     * )
     */
    /**
     * @param \App\Http\Requests\AdventureStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(AdventureStoreRequest $request)
    {
        $adventure = Adventure::create($request->validated());

        $request->session()->flash('adventure.id', $adventure->id);

        return redirect()->route('adventure.index');
    }

    /**
     * @OA\Get(
     *     path="/adventure/{id}",
     *     description="Adventure Show",
     *     @OA\Response(response="default", description="Adventure Show")
     * )
     */
    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Adventure $adventure
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Adventure $adventure)
    {
        return view('adventure.show', compact('adventure'));
    }

    /**
     * @OA\Get(
     *     path="/adventure/{id}/edit",
     *     description="Adventure Edit",
     *     @OA\Response(response="default", description="Adventure Edit")
     * )
     */
    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Adventure $adventure
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Adventure $adventure)
    {
        return view('adventure.edit', compact('adventure'));
    }

    /**
     * @OA\Put(
     *     path="/adventure/{id}",
     *     description="Adventure Update",
     *     @OA\Parameter(
     *          name="id",
     *          description="Adventure id",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *     @OA\Parameter(
     *          name="title",
     *          description="Adventure title",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *     @OA\Parameter(
     *          name="code",
     *          description="Adventure code",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *     @OA\Parameter(
     *          name="description",
     *          description="Adventure description",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="string"
     *          )
     *      ),
     *     @OA\Response(response="default", description="Adventure Update")
     * )
     *
     */
    /**
     * @param \App\Http\Requests\AdventureUpdateRequest $request
     * @param \App\Models\Adventure $adventure
     * @return \Illuminate\Http\Response
     */
    public function update(AdventureUpdateRequest $request, Adventure $adventure)
    {
        $adventure->update($request->validated());

        $request->session()->flash('adventure.id', $adventure->id);

        return redirect()->route('adventure.index');
    }

    /**
     * @OA\Delete(
     *     path="/adventure/{id}",
     *     description="Adventure Destroy",
     *     @OA\Response(response="default", description="Adventure Destroy")
     * )
     */
    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Adventure $adventure
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Adventure $adventure)
    {
        $adventure->delete();

        return redirect()->route('adventure.index');
    }
}
