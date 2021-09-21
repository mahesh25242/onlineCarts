@extends('pdf.layouts.app')
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
                                @if ( $shopRenewal->id > 0 )
                                    <span style="color: red; margin-top:5px; display: block;">Invoice Number: {{ $shopRenewal->id }}</span>
                                @endif
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
                                    <h3>{{ $shopRenewal->shop->name }}</h3>
                                    @if ( $shopRenewal->shop->email )
                                        {{ $shopRenewal->shop->email }}<br/>
                                    @endif

                                    @if ( $shopRenewal->shop->phone )
                                        {{ $shopRenewal->shop->phone }} <br/>
                                    @endif

                                    @if ( $shopRenewal->shop->address )
                                        {{ $shopRenewal->shop->address }} <br/>
                                    @endif

                                    @if ( $shopRenewal->shop->country )
                                        {{ $shopRenewal->shop->country->name }},
                                    @endif

                                    @if ( $shopRenewal->shop->state )
                                        {{ $shopRenewal->shop->state->name }},
                                    @endif

                                    @if ( $shopRenewal->shop->city )
                                        {{ $shopRenewal->shop->city->name }},
                                    @endif

                                    @if ( $shopRenewal->shop->pin )
                                        {{ $shopRenewal->shop->pin }}
                                    @endif
	                            </p>
    		                </td>
		                    <td style="text-align: right; padding-top: 20px;" valign="top">
      		                    <span style="">Order Date: {{ $shopRenewal->created_at->format("d M, Y") }}</span>
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
                            <td>
                                <h4 style="margin: 0; padding: 0;">
                                    @if ( $shopRenewal->package )
                                        {{ $shopRenewal->package->name }}
                                    @else
                                        Free Extend
                                    @endif
                                </h4>
                            </td>
                            <td>
                                @if ( $shopRenewal->package )
                                    {{ $shopRenewal->package->duration }} months
                                @else
                                    --
                                @endif
                            </td>
                            <td>
                                {{ \Carbon\Carbon::parse($shopRenewal->from_date)->format('d M, Y') }}
                            </td>
                            <td>
                                {{ \Carbon\Carbon::parse($shopRenewal->to_date)->format('d M, Y') }}
                            </td>
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
                            <td style="text-align: left">
                                @if ( $shopRenewal->package )
                                    {{ $shopRenewal->package->name }}
                                @else
                                    Free Extend
                                @endif
                            </td>
                            <td style="text-align: right">
                                {{ $shopRenewal->amount }}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-top: 20px; padding-bottom: 20px">   </td>
                            <td style="padding-top: 20px; padding-bottom: 20px"><h2 style="margin: 0;  padding: 0; float: right;">{{ $shopRenewal->amount }}</h2></td>
                        </tr>
                    </tbody>
                </table>
		    </td>
        </tr>
        <tr>
	        <td>
                <p style="color: #767676; margin-bottom:0px; padding: 0;">
                    Computer generated invoice Issued by www.onlinecarts.in
                </p>
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
                                            <td width="45">
                                                <img src="https://onlinecarts.in/front/assets/logo.png" width="50px">
                                            </td>
                                            <td>
	                                            <p style="color: #767676; margin-bottom:0px; padding: 0; font-size:12px;">
                                                    <b>onlinecarts.in</b><br>
                                                    Andoor, Palackattumala P.O<br>
                                                    Kottayam, Kerala - 686635<br>
                                                    India.
                                                </p>
                                            </td>
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
	            <p style="color: #767676; margin-bottom:0px; padding: 0; font-size:12px;">Must read and download terms & condition on <span style="font-weight:bold;">https://onlinecarts.in/front/privacy-policy, https://onlinecarts.in/front/terms-and-condition</span>.</p>
	        </td>
        </tr>
        <tr>
            <td style="padding-top:5px;">
	            <p style="color: #767676; margin-bottom: 0px; font-size:12px;">
                    @if ( $request )
                        {{ $request->ip() }} / {{ $request->header('User-Agent') }}
                    @else
                        Free Extend
                    @endif
                </p>
	        </td>
        </tr>
  </tbody>
</table>


@endsection
