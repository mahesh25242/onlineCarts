@if($auth)

@else
<p>
    To view your orders first you want to login to admin side of your shop.
    <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin'}, '*');">Click Here to login to admin</a>
</p>
@endif


<p>
   Please click on
   <strong>
       <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin/orders'}, '*');">Orders</a>
    </strong> menu from main menu. There it will list latest order at first.
</p>
