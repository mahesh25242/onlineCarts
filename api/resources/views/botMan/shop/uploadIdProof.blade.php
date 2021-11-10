@if($auth)

@else
<p>
    To upload id proof first you want to login to admin side of your shop.
    <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin'}, '*');">Click Here to login to admin</a>
</p>
@endif

<p>
   Please click on <strong>
   <a href="javascript:{}" onClick="window.top.postMessage({'redirect': 'admin/account'}, '*');">My Account</a>
    </strong> menu from main menu. There you can see <b>Please upload a ID</b> section there first select the id proof type and then you get an upload button to upload id proof.
</p>
<p>
    <i>The id proof is not mandatary. We ask id proof only because to avoid misuse of our service. And also if multiple abuses are reported then system will automatically block your account unless you not upload an id proof.</i>
</p>
