@extends('email.layouts.app')
@section('content')
    <p>Hello  Admin,</p>
    A new query was raised
    <ul>
        <li>Name:  {{ $details->name }}</li>
        <li>Email: {{ $details->email }}</li>
        <li>Phone: {{ $details->phone }}</li>
        <li> {!! $details->comment !!}</li>
    </ul>
    <br/>
@endsection
