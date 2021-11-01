@if($auth)

@else
<p>
    To check your coins first you want to login to admin side of your shop.
    <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin'}, '*');">Click Here to login to admin</a>
</p>
@endif


<p>
   Please choose
   <strong>
       <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin/details'}, '*');">Shop Settings</a>
    </strong> menu from main menu and then expand <strong>Coins</strong>. There it will display the coins.
</p>
