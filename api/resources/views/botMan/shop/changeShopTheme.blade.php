@if($auth)

@else
<p>
    To change theme first you want to login to admin side of your shop.
    <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin'}, '*');">Click Here to login to admin</a>
</p>
@endif

<p>
   Please choose <strong>
   <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin/details'}, '*');">Shop Settings</a>
    </strong> menu from main menu and then expand <strong>Theme and Branding</strong>. There you can change the theme , logo & favicon of your shop.
</p>
