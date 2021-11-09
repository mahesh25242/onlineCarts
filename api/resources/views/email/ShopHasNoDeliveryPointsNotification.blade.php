@extends('email.layouts.app')
@section('content')
    <p>Hello  {{ $shop->name }},</p>
    <p>You han't set any delivery/pick up point to your customer order.
    </p>
    <p>
        To add delivery point, Please login to your shop admin panel by using this link: <a href="{{ $shop->shop_url }}/admin">{{ $shop->shop_url }}/admin</a>
        and then click on <b>Delivery</b> from main menu and then choose  <b>Delivery Locations</b> tab there you can add your delivery or pick up points.
    </p>
@endsection

