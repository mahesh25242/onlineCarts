@extends('email.layouts.app')
@section('content')
    <p>Hello  {{ $user->fname }},</p>
    <p>Your are successfully created your shop.</p>
    @if ( !$shop->is_mobile_verified )
        <b>First you go to your shop admin and click on <i>Click here to verify your mobile</i> link and veryfy your mobile with otp. THen only you can get order through whatsapp</b>
    @endif

    <ul>
        <li>Name: {{ $shop->name }}</li>
        <li>Email: {{ $shop->email }}</li>
        <li>Address: {{ $shop->address }}</li>
        <li>Shop Url: https://www.onlinecarts.in{{ $shop->base_path }}</li>
        <li>Shop Admin Url: https://www.onlinecarts.in{{ $shop->base_path }}admin</li>
    </ul>
@endsection
