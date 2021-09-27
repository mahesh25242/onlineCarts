@extends('email.layouts.app')
@section('content')
    <p>Hello  {{ $shop->name }},</p>
    <p>
        Your shop is
        @if ( !$shop->status )
            Deactivated.
        @else
            Activated successfully
        @endif
         .</p>

         @if ( !$others["m"] )
            <p>{{ $others["m"] }}</p>
        @endif

    <ul>
        <li>Name: {{ $shop->name }}</li>
        <li>Email:  {{ $shop->email }}</li>
        <li>Address: {{ $shop->address }}</li>
        <li>Shop Url: https://www.onlinecarts.in{{ $shop->base_path }}</li>
    </ul>
@endsection

