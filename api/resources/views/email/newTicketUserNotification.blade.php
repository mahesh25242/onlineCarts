@extends('email.layouts.app')
@section('content')
    <p>Hello {!! $helpTicket->shop->name !!},</p>
    Your ticket was submited. We are loogking to it. and update you soon.
@endsection

