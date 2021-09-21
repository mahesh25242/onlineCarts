@extends('email.layouts.app')
@section('content')
    <p>Hello  {{ $shopRenewal->shop->name }},</p>
    @if ( $shopRenewal->amount > 0 ) Your payment {{ $shopRenewal->amount }} is received, Thank you.@endif Your subscription was re-newed and now the current shop expiration date is: {{ $shopRenewal->to_date }}

    @if ( $shopRenewal->comments )
        Comment from Admin
        <p>{{ $shopRenewal->comments }}</p>
    @endif

    @if ( $shopRenewal->attachement )
        <a href="https://api.onlinecarts.in/assets/shop/{{ $shopRenewal->shop->shop_key }}/general/{{ $shopRenewal->attachement }}">Click here to view submited receipt</a>
    @endif

    @if ( $shopRenewal->amount > 0 )
        Please find attachment for the invoice
    @endif



    If you have any query related to this please use your Subscription id as <b>{{ $shopRenewal->id }}</b>
@endsection
