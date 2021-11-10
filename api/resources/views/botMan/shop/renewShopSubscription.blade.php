@if($auth)

@else
<p>
    To re-new your subscription first you want to login to admin side of your shop.
    <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin'}, '*');">Click Here to login to admin</a>
</p>
@endif


<p>
   Please choose
   <strong>
       <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin/renew'}, '*');">Pricing</a>
    </strong> menu from main menu . There you can click <b>choose it</b> button. There you will get how to make payment
</p>

<br/>
@if($shop->is_default)
    <p>
        Currently you are chatting with <b>demo shop</b>. There you ca't find that renew button.
    </p>
@else
    <br/>
    @if($shop->shopCurrentRenewal)
    <p>
        Your current plan will expire
        @if($shop->shopCurrentRenewal->show_message )
            in {{ $shop->shopCurrentRenewal->remaining_days  }} {{ \Illuminate\Support\Str::plural('day', $shop->shopCurrentRenewal->remaining_days) }}.
              <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin/renew'}, '*');">Click Here to renew</a>
        @else
            in {{ $shop->shopCurrentRenewal->to_date }}.
            So you can renew your plan only before {{ $shop->shopCurrentRenewal->show_message_days }} days.
        @endif


    </p>
    @else
    <p>
        Currently you don't have any active plan. Please contact to <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'contact-us'}, '*');">{{ config('app.admin_email') }}</a>
    </p>
    @endif
@endif
