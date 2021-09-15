@extends('email.layouts.app')
@section('content')
    <p>Hello  {{ $user->fname }} {{ $user->lname }},</p>
    <p>Your password was successfully changed. If its not done by you please contact Admin </p>
@endsection
