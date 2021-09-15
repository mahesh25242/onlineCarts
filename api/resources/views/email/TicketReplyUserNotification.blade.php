@extends('email.layouts.app')
@section('content')
    <p>Hello {{ $helpTicket->shop->name }},</p>
    Your reply for <b>{{ $helpTicket->subject }}</b> was submited.
@endsection
