@extends('email.layouts.app')
@section('content')
    <p>Hello  {{ $user->fname }},</p>
    <p>Your are successfully created your shop.</p>
    <ul>
        <li>Name: {{ $shop->name }}</li>
        <li>Email: {{ $shop->email }}</li>
        <li>Address: {{ $shop->address }}</li>
        <li>Shop Url: https://www.onlinecarts.in{{ $shop->base_path }}</li>
        <li>Shop Admin Url: https://www.onlinecarts.in{{ $shop->base_path }}admin</li>
    </ul>
@endsection
