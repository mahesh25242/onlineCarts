@extends('email.layouts.app')
@section('content')
    <p>Hello  Admin,</p>
    A reply for ticket <b>{{ $helpTicket->subject }}</b> was received

    Shop details
    <ul>
        <li>Name:  {{ $helpTicket->shop->name }}</li>
        <li>Created At: {{ date('Y-m-d H:i:s') }}</li>
        <li>Ticket Title: {{ $helpTicket->subject }}</li>
    </ul>
    <br/>
    <p>
        {!! $helpTicket->content !!}
    </p>
@endsection
