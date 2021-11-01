@if($auth)

@else
<p>
    Before you want to apply your coupon code first you want to login to admin side of your shop.
    <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin'}, '*');">Click Here to login to admin</a>
</p>
@endif


<p>
   Then click on
   <strong>
       <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin/details'}, '*');">Shop Settings</a>
    </strong> menu from main menu and then expand <strong>Coins</strong>. There it you will get a text box with code, there your can enter your code and click Redeem button.
</p>
