@extends('email.layouts.app')
@section('content')

<table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
  <tbody>
<tr>
      <td class="bg">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td style="padding-bottom: 20px;">

		  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td width="45"><img src="https://onlinecarts.in/front/assets/logo.png" width="50px"></td>
      <td><h1 style="font: 'arial'; margin:0; padding: 0; color: dodgerblue;">Onlinecarts.in &nbsp;&nbsp;</h1></td>
    </tr>
  </tbody>
</table>


		  </td>
      <td style="text-align: right; padding-bottom: 20px;">
		  <h2 style="margin: 0; padding: 0;">INVOICE </h2>
		  <span style="color: red; margin-top:5px; display: block;">Invoice Number: <?php  echo ($shopRenewal->id) ? $shopRenewal->id: '';?></span>
		</td>
    </tr>
  </tbody>
</table>


		</td>
    </tr>
<tr>
      <td style="padding-bottom:20px;">

		  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-bottom:10px;">
  <tbody>
    <tr>
		<td>
		<p>Invoice To</p>
		  <p>
<h3><?php echo $shopRenewal->shop->name;?></h3>
<?php echo $shopRenewal->shop->email;?><br/>
<?php echo $shopRenewal->shop->phone;?><br/>
<?php echo $shopRenewal->shop->address;?><br/>
<?php echo $shopRenewal->shop->country->name;?>,
<?php echo $shopRenewal->shop->state->name;?>,
<?php echo $shopRenewal->shop->city->name;?>,
<?php echo $shopRenewal->shop->pin;?>
		  </p>
		</td>
		<td style="text-align: right; padding-top: 20px;" valign="top">
      		<span style="">Order Date: <?php echo $shopRenewal->created_at->format("d M, Y");?></span>
		</td>

    </tr>
  </tbody>
</table>


		  </td>
    </tr>
<tr>
<td style="border-top:1px solid #0380DB; padding-top:5px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-bottom-width: 3px;" class="margin-top-30 border-2">
  <tbody>
    <tr>
      <td style="color: #949292;">Plan Details</td>
      <td style="color: #949292;">Validity</td>
      <td style="color: #949292;">Plan Start</td>
      <td style="color: #949292;">Plan Expiry</td>
    </tr>
	  <tr>
      <td><h4 style="margin: 0; padding: 0;"><?php echo $shopRenewal->package->name;?></h4></td>
      <td><?php echo $shopRenewal->package->duration;?> month(s)</td>
      <td><?php echo \Carbon\Carbon::parse($shopRenewal->from_date)->format('d M, Y');?></td>
      <td><?php echo \Carbon\Carbon::parse($shopRenewal->to_date)->format('d M, Y');?></td>
    </tr>
  </tbody>
</table>



	</td>
</tr>
<tr>
      <td style="padding-top:20px; padding-bottom:30px;">
		  <h3>Invoice Details:</h3>


		  <table width="100%" border="0" style="border-bottom-width: 3px" class="border" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <th style="text-align: left; background: #000; color: #fff;">Plan Name</th>
      <th style="text-align: right; background: #000;  color: #fff;" width="100">Price</th>
    </tr>
	  <tr>
      <td style="text-align: left"><?php echo $shopRenewal->package->name;?></td>
      <td style="text-align: right"><?php echo $shopRenewal->amount;?></td>
    </tr>

    <tr>
      <td style="padding-top: 20px; padding-bottom: 20px">   </td>
      <td style="padding-top: 20px; padding-bottom: 20px"><h2 style="margin: 0;  padding: 0; float: right;"><?php echo $shopRenewal->amount;?></h2></td>
    </tr>
  </tbody>
</table>


		  </td>
    </tr>
<tr>
	<td>
	<p style="color: #767676; margin-bottom:0px; padding: 0;">
Computer generated invoice Issued by www.onlinecarts.in</p>
	</td>
	</tr>
<tr>
<td style="padding-top: 20px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 15px;">
		  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td width="45"><img src="https://mayatutors.com/maya-logo.21a6d58ee3d97e31f84a.svg" width="50px"></td>
      <td>
	<p style="color: #767676; margin-bottom:0px; padding: 0; font-size:12px;">
<b>onlinecarts.in</b><br>
Andoor, Palackattumala P.O<br>
Kottayam, Kerala - 686635<br>
India.</p></td>
    </tr>
  </tbody>
</table>



		</td>
      <td style="text-align: center" align="center">
		</td>
    </tr>
  </tbody>
</table>
	</td>

	<td>


	</td>
</tr>
<tr>
<td style="border-bottom: 1px solid #767676; padding-top:10px; padding-bottom: 10px">
	<p style="color: #767676; margin-bottom:0px; padding: 0; font-size:12px;">Must read and download terms & condition on <span style="font-weight:bold;">https://onlinecarts.in/privacy-policy, https://onlinecarts.in/terms-and-conditions</span>.</p>
	</td>
</tr>
<tr>
<td style="padding-top:5px;">
	<p style="color: #767676; margin-bottom: 0px; font-size:12px;">
        <?php echo (isset($request) && $request) ? $request->ip().'/'.$request->header('User-Agent') : '';?>
    </p>
	</td>
</tr>

  </tbody>
</table>


@endsection
