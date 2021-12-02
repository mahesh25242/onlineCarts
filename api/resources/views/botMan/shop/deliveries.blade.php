@if ($shopDelivery->count())
    @if($isHome)
        Yes we are offering home deliveries in below locality. If your house is in any of these locality then you will get home delivery.
    @else
        Our branches are located in below locality
    @endif

    <ol class="list-group list-group-numbered">
    @foreach ($shopDelivery as $sd)
           <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">{{ $sd->name }}</div>
                    @if($isHome)
                        You can choose this as your delivery location.
                        @if($sd->min_amount)
                            Minimum order amount is <b class="text-success">₹{{ $sd->min_amount }}</b>.
                        @endif
                        @if($sd->charge)
                            For this delivery you should pay <b class="text-success">₹{{ $sd->charge }}</b> for delivery charge.
                        @else
                            For this delivery you will get free delivery.
                        @endif
                    @else
                        You can pick up your ordered item from here.
                        @if($sd->charge)
                            If your ordering your item for take away then we will be charged extra <b class="text-success">₹{{ $sd->charge }}</b> for packing for this branch.
                        @else
                            Witout any extra charge.
                        @endif
                        @if($sd->description)
                            <p>
                                {{ $sd->description }}
                            </p>
                        @endif
                        @if($sd->address)
                            <address>
                                {{ $sd->address }}
                            </address>
                        @endif
                        @if($sd->map_url)
                            <a href="{{ $sd->map_url }}" target="_blank" class="btn btn-sm btn-primary">                                
                                Open in Map
                            </a>
                        @endif
                    @endif
                </div>
           </li>
    @endforeach
    </ol>

@else
    @if($isHome)
        Sorry we are not offerring home delivery to your locality.
    @else
        we have only one branch that is located in  <br/>
        <b>{{ $shop->address }}, {{ $shop->city->name }}, {{ $shop->state->name }}, {{ $shop->country->name }} - {{ $shop->pin }}.</b>
    @endif
@endif

