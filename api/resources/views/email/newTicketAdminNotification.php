<p>Hello  Admin,</p>
A new ticket was raised

Shop details
<ul>
    <li>Name:  <?php echo $helpTicket->shop->name;?></li>
    <li>Created At: <?php echo date('Y-m-d H:i:s');?></li>
    <li>Ticket Title: <?php echo $helpTicket->subject;?></li>
</ul>
<br/>
<p>
    <?php echo $helpTicket->content;?>
</p>
