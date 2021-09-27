@extends('email.layouts.app')
@section('content')
    <p>Hello  {{ $shop->name }},</p>
    <p>Your app will stop working.</p>
    <ul>
        <li>Name: {{ $shop->name }}</li>
        <li>Email:  {{ $shop->email }}</li>
        <li>Address: {{ $shop->address }}</li>
        <li>Shop Url: https://www.onlinecarts.in{{ $shop->base_path }}</li>
    </ul>
@endsection

