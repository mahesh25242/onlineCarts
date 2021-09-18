@extends('email.layouts.app')
@section('content')
    <p>Hello  {{ $shopRenewal->shop->name }},</p>
    @if ( $shopRenewal->amount > 0 ) Your payment {{ $shopRenewal->amount }} is received, Thank you.@endif Your subscription was re-newed and now the current shop expiration date is: {{ $shopRenewal->to_date }}

    @if ( $shopRenewal->amount > 0 )
        Please find attachment for the invoice
    @endif

    If you have any query related to this please use your Subscription id as {{ $shopRenewal->id }}
@endsection
