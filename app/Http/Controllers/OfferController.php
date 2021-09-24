<?php

namespace App\Http\Controllers;

use App\Http\Requests\OfferStoreRequest;
use App\Http\Requests\OfferUpdateRequest;
use App\Models\Offer;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $offers = Offer::all();

        return view('offer.index', compact('offers'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('offer.create');
    }

    /**
     * @param \App\Http\Requests\OfferStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(OfferStoreRequest $request)
    {
        $offer = Offer::create($request->validated());

        $request->session()->flash('offer.id', $offer->id);

        return redirect()->route('offer.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Offer $offer
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Offer $offer)
    {
        return view('offer.show', compact('offer'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Offer $offer
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Offer $offer)
    {
        return view('offer.edit', compact('offer'));
    }

    /**
     * @param \App\Http\Requests\OfferUpdateRequest $request
     * @param \App\Models\Offer $offer
     * @return \Illuminate\Http\Response
     */
    public function update(OfferUpdateRequest $request, Offer $offer)
    {
        $offer->update($request->validated());

        $request->session()->flash('offer.id', $offer->id);

        return redirect()->route('offer.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Offer $offer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Offer $offer)
    {
        $offer->delete();

        return redirect()->route('offer.index');
    }
}
