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
    </strong> menu from main menu . There you can click choose button.
</p>
